# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from typing import Any, Text, Dict, List
import re

import mariadb
import sys

from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.events import FollowupAction, SlotSet, AllSlotsReset
from rasa_sdk.executor import CollectingDispatcher
from sqlalchemy import desc

# Connect to MariaDB Platform
try:
    conn = mariadb.connect(
        user="root",
        password="chatbot",
        host="127.0.0.1",
        port=3306,
        database="brockdb"
    )

except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

###########################
##### COURSE ACTIONS ######
###########################

class ActionCourseGeneralInfo(Action):
    def name(self) -> Text:
        return "action_course_general_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = normalize_course_code(tracker.get_slot('CourseCode'))
        course_duration = tracker.get_slot('CourseDuration')
        course_section = tracker.get_slot('CourseSection')

        # response
        if course_code:
            cur = conn.cursor()
            cur.execute(
                "SELECT CrsCode, CrsName, CrsDesc, PreReqs FROM course WHERE CrsCode=? AND CrsDuration=? AND (DeliveryMethod<>'LAB' OR DeliveryMethod<>'TUT');",
                (course_code,course_duration)
            )
            try:
                course_info = next(cur)
                dispatcher.utter_message(text=f'Here\'s some info about {course_info[0]}, {course_info[1]}: {course_info[2]}.')
                print(course_info[3])
                if course_info[3]:
                    dispatcher.utter_message(f'Here are the prerequisites: {course_info[3]}')
            except:
                dispatcher.utter_message(text="I couldn't find that course")
        return [AllSlotsReset()]

class ActionCourseLabSem(Action):
    def name(self) -> Text:
        return "action_course_labORsem"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = normalize_course_code(tracker.get_slot('CourseCode'))
        course_duration = tracker.get_slot('CourseDuration')
        count=0
        # response
        if course_code:
            cur = conn.cursor()
            cur.execute(
                "SELECT CrsCode, CrsName, COUNT(*) FROM course WHERE CrsCode=? AND CrsDuration=? AND (DeliveryMethod LIKE 'LAB%' OR DeliveryMethod LIKE 'SEM%');",
                (course_code,course_duration)
            )
            try:
                course_info = next(cur)
                count = course_info[2]
                dispatcher.utter_message(text=f'{course_info[0]}, {course_info[1]}, has {course_info[2]} labs/seminars.')
                print(count)
            except:
                dispatcher.utter_message(text="I couldn't find that course")
            if count != 0: 
                cur.execute( 
                    "SELECT DeliveryMethod, CrsDays, CrsTiming, CrsLocation FROM course WHERE CrsCode=? AND CrsDuration=? AND (DeliveryMethod LIKE 'LAB%' OR DeliveryMethod LIKE 'SEM%');",
                    (course_code,course_duration)
                )  
                info = cur.fetchall()
                for row in info:
                    day = get_day(row[1]) 
                    location = get_location(row[3])
                    dispatcher.utter_message(text=f'{row[0]} runs {day}, from {row[2]} at {location}.')
            else:
                dispatcher.utter_message(text=f'It appears that {course_code} does not have any labs/seminars.')
        return [AllSlotsReset()]


class ActionCourseTerm(Action):
    def name(self) -> Text:
        return "action_course_term"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = normalize_course_code(tracker.get_slot('CourseCode'))
        course_duration = tracker.get_slot('CourseDuration')

        # response
        if course_code:
            cur = conn.cursor()
            cur.execute(
                "SELECT CrsCode, CrsName, CrsDuration FROM course WHERE CrsCode=? AND DeliveryMethod LIKE 'LEC%';",
                (course_code,)
            )
            try:
                previous_duration= ""
                info = cur.fetchall()
                for row in info:
                    duration = get_duration(row[2])
                    if previous_duration != duration:
                       dispatcher.utter_message(text=f'{row[0]}, {row[1]}, runs {duration} for duration {row[2]}.')
                       previous_duration = duration
            except:
                dispatcher.utter_message(text="I couldn't find that course")
        return [AllSlotsReset()]


class ActionCourseInstructor(Action):
    def name(self) -> Text:
        return "action_course_instructor"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = normalize_course_code(tracker.get_slot('CourseCode'))

        # response
        if course_code:
            cur = conn.cursor()
            cur.execute(
                "SELECT CrsCode, CrsName, CrsInstructor FROM course WHERE CrsCode=? AND DeliveryMethod LIKE 'LEC%';",
                (course_code,)
            )
            try:
                info = cur.fetchall()
                for row in info:
                    instructor=get_instructor(row[2])
                    dispatcher.utter_message(text=f'{row[0]}, {row[1]} is instructed by {instructor}.')
            except:
                dispatcher.utter_message(text="I couldn't find that course")
        return [AllSlotsReset()]


class ActionCoursePrereqs(Action):
    def name(self) -> Text:
        return "action_course_prereqs"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = normalize_course_code(tracker.get_slot('CourseCode'))
        course_duration = tracker.get_slot('CourseDuration')

        # response
        if course_code:
            cur = conn.cursor()
            cur.execute("SELECT CrsCode, CrsName, PreReqs FROM course WHERE CrsCode=? AND (DeliveryMethod NOT LIKE 'LAB%' OR DeliveryMethod NOT LIKE 'TUT%' OR DeliveryMethod NOT LIKE 'SEM%');",
            (course_code,) )
            try:
                course_info = next(cur)
                prereq = get_prereq(course_info[2])
                dispatcher.utter_message(text=f'{course_info[0]}, {course_info[1]}, has the following p{prereq}.')
            except:
                dispatcher.utter_message(text="I couldn't find that course")
        return [AllSlotsReset()]

#########################
##### CLUB ACTIONS ######
#########################

class ActionClubGeneralInfo(Action):
    def name(self) -> Text:
        return "action_club_general_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Club")
        club_keyword = False
        try:
            print(club_keyword)
            club_keyword = next(entity)
            print(club_keyword)
        except:
            pass

        # response
        if club_keyword:
            club_wildcard = "%" + club_keyword + "%"
            print(club_wildcard)
            cur = conn.cursor()
            cur.execute(
                "SELECT ClubName, ClubContact, ClubDesc FROM club WHERE ClubDesc LIKE %s or ClubName LIKE %s;",
                (club_wildcard, club_wildcard)
            )
            
            try:
                info = next(cur)
                dispatcher.utter_message(text=f'''
                {info[0]} might interest you.  Here's a bit of information about it.
                ''')
                dispatcher.utter_message(text=f'''
                    {info[2]}.  You can contact them at {info[1]}.
                ''')
            except:
                dispatcher.utter_message(text="I'm not sure if we have that club.  Here's a link to all of our clubs. https://www.brockbusu.ca/involvement/clubs/")

        else:
            dispatcher.utter_message(text="I'm not sure if we have that club.  Here's a link to all of our clubs. https://www.brockbusu.ca/involvement/clubs/")
        return []

#########################
##### EXAM ACTIONS ######
#########################

class ActionExamGeneralInfo(Action):
    def name(self) -> Text:
        return "action_exam_general_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = normalize_course_code(tracker.get_slot('CourseCode'))
        course_duration = tracker.get_slot('CourseDuration')
        course_section = tracker.get_slot('CourseSection')

        # response
        if course_code:
            cur = conn.cursor()
            cur.execute(
                "SELECT CrsCode, ExamDate, ExamStartTime, ExamEndTime, ExamLocation FROM exam WHERE CrsCode=? AND CrsDuration=? AND CrsSection=?;",
                (course_code,course_duration,course_section)
            )
            try:
                exam_info = next(cur)
                dispatcher.utter_message(text=f'The exam for {exam_info[0]} will be held on {exam_info[1]}, from {exam_info[2]} to {exam_info[3]}, at {exam_info[4]}')
            except:
                dispatcher.utter_message(text="I couldn't find that exam")
        return [AllSlotsReset()]


class ActionExamLocation(Action):
    def name(self) -> Text:
        return "action_exam_location"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = normalize_course_code(tracker.get_slot('CourseCode'))
        course_duration = tracker.get_slot('CourseDuration')
        course_section = tracker.get_slot('CourseSection')

        # response
        if course_code:
            cur = conn.cursor()
            cur.execute(
                "SELECT CrsCode, ExamLocation FROM exam WHERE CrsCode=? AND CrsDuration=? AND CrsSection=?;",
                (course_code,course_duration,course_section)
            )

            try:
                exam_info = next(cur)
                dispatcher.utter_message(text=f'The exam for {exam_info[0]} will be held at {exam_info[1]}')
            except:
                dispatcher.utter_message(text="I couldn't find that exam")
        return [AllSlotsReset()]


class ActionExamDate(Action):
    def name(self) -> Text:
        return "action_exam_date"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = normalize_course_code(tracker.get_slot('CourseCode'))
        course_duration = tracker.get_slot('CourseDuration')
        course_section = tracker.get_slot('CourseSection')

        # response
        if course_code:
            cur = conn.cursor()
            cur.execute(
                "SELECT CrsCode, ExamDate, ExamStartTime, ExamEndTime FROM exam WHERE CrsCode=? AND CrsDuration=? AND CrsSection=?;",
                (course_code,course_duration,course_section)
            )
            try:
                exam_info = next(cur)
                dispatcher.utter_message(text=f'The exam for {exam_info[0]} will be held on {exam_info[1]} from {exam_info[2]} to {exam_info[3]}')
            except:
                dispatcher.utter_message(text="I couldn't find that exam")
        return [AllSlotsReset()]


class ActionExamDelivery(Action):
    def name(self) -> Text:
        return "action_exam_delivery"
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = normalize_course_code(tracker.get_slot('CourseCode'))
        course_duration = tracker.get_slot('CourseDuration')
        course_section = tracker.get_slot('CourseSection')

        if course_code:
            cur = conn.cursor()
            cur.execute(
                "SELECT CrsCode, ExamLocation FROM exam WHERE CrsCode=? AND CrsDuration=? AND CrsSection=?;",
                (course_code,course_duration,course_section)
            )
            try:
                exam_info = next(cur)
                if exam_info[1] == 'SAKAI':
                    dispatcher.utter_message(text=f'The {exam_info[0]} exam will be online')
                else: 
                  dispatcher.utter_message(text=f'The exam for {exam_info[0]} will be held face-to-face at {exam_info[1]}')
            except:
                dispatcher.utter_message(text="I couldn't find that exam")
        return [AllSlotsReset()]


############################
##### PROGRAM ACTIONS ######
############################

class ActionProgramGeneralInfo(Action):
    def name(self) -> Text:
        return "action_program_general_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Program")
        program_name = False
        try:
            program_name = next(entity)
        except:
            pass

        # response
        if program_name:
            cur = conn.cursor()
            cur.execute(
                "SELECT PrgName, PrgDesc, PrgLink, PrgFac FROM program WHERE PrgName=?;",
                (program_name,)
            )

            try:
                info = next(cur)
                dispatcher.utter_message(text=f'''
                The {info[0]} program is offered by the {info[3]}.  Here's a bit of information about it.
                ''')
                dispatcher.utter_message(text=f'''
                    {info[1]}.  Here's a link for more information: {info[2]}
                ''')
            except:
                dispatcher.utter_message(text="I couldn't find that program")

        else:
            dispatcher.utter_message(text="I couldn't find that program")
        return []

class ActionProgramRequirements(Action):
    def name(self) -> Text:
        return "action_program_requirements"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Program")
        program_name = False
        try:
            program_name = next(entity)
        except:
            pass

        # response
        if program_name:
            cur = conn.cursor()
            cur.execute(
                "SELECT PrgName, PrgReqs FROM program WHERE PrgName=?;",
                (program_name,)
            )

            try:
                info = next(cur)
                dispatcher.utter_message(text=f'''
                Here are the admission requirements for {info[0]}, if you were a Secondary Student at an Ontario high school.
                ''')
                dispatcher.utter_message(text=f'''
                    {info[1]}
                ''')
                dispatcher.utter_message(text=f'''
                    For more details, visit our admissions website: https://brocku.ca/admissions/undergraduate/
                ''')
            except:
                dispatcher.utter_message(text="I couldn't find that program")

        else:
            dispatcher.utter_message(text="I couldn't find that program")
        return []

############################
##### FACULTY ACTIONS ######
############################

class ActionFacultyGeneralInfo(Action):
    def name(self) -> Text:
        return "action_faculty_general_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Faculty")
        faculty_name = False
        try:
            faculty_name = next(entity)
        except:
            pass

        # response
        if faculty_name:
            first_name = faculty_name.split(' ')[0]
            last_name = faculty_name.split(' ')[1:]
            last_name = " ".join(last_name) # turn last name from list into string separated by spaces
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, Title, Email, Extension, FacLocation FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            try:
                info = next(cur)
                dispatcher.utter_message(text=f'''
                {info[0]} {info[1]} is a {info[2]} here at Brock.  They can be reached at {info[3]} or extension number {info[4]}.  Their office is located at {info[5]}.
                ''')
            except:
                dispatcher.utter_message(text="Sorry, I couldn't find that person.")

            
        else:
            dispatcher.utter_message(text="Sorry, I couldn't find that person.")
        return []

class ActionFacultyDepartment(Action):
    def name(self) -> Text:
        return "action_faculty_department"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Faculty")
        faculty_name = False
        try:
            faculty_name = next(entity)
        except:
            pass
        
        # response
        if faculty_name:
            first_name = faculty_name.split(' ')[0]
            last_name = faculty_name.split(' ')[1:]
            last_name = " ".join(last_name) # turn last name from list into string separated by spaces
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, FacDept FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            try:
                info = next(cur)
                dispatcher.utter_message(text=f'''
                {info[0]} {info[1]} works in {info[2]}
                ''')
            except:
                dispatcher.utter_message(text="Sorry, I couldn't find that person.")

            
        else:
            dispatcher.utter_message(text="Sorry, I couldn't find that person.")
        return []

class ActionFacultyEmail(Action):
    def name(self) -> Text:
        return "action_faculty_email"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Faculty")
        faculty_name = False
        try:
            faculty_name = next(entity)
        except:
            pass

        # response
        if faculty_name:
            first_name = faculty_name.split(' ')[0]
            last_name = faculty_name.split(' ')[1:]
            last_name = " ".join(last_name) # turn last name from list into string separated by spaces
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, Email FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            try:
                info = next(cur)
                dispatcher.utter_message(text=f'''
                {info[0]} {info[1]}'s email is {info[2]}
                ''')
            except:
                dispatcher.utter_message(text="Sorry, I couldn't find that person.")

            
        else:
            dispatcher.utter_message(text="Sorry, I couldn't find that person.")
        return []

class ActionFacultyTitle(Action):
    def name(self) -> Text:
        return "action_faculty_title"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Faculty")
        faculty_name = False
        try:
            faculty_name = next(entity)
        except:
            pass

        # response
        if faculty_name:
            first_name = faculty_name.split(' ')[0]
            last_name = faculty_name.split(' ')[1:]
            last_name = " ".join(last_name) # turn last name from list into string separated by spaces
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, Title FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            try:
                 info = next(cur)
                 dispatcher.utter_message(text=f'''
                {info[0]} {info[1]}'s official title is {info[2]}
                ''')
            except:
                dispatcher.utter_message(text="Sorry, I couldn't find that person.")

            
        else:
            dispatcher.utter_message(text="Sorry, I couldn't find that person.")
        return []

class ActionFacultyExtension(Action):
    def name(self) -> Text:
        return "action_faculty_extension"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Faculty")
        faculty_name = False
        try:
            faculty_name = next(entity)
        except:
            pass

        # response
        if faculty_name:
            first_name = faculty_name.split(' ')[0]
            last_name = faculty_name.split(' ')[1:]
            last_name = " ".join(last_name) # turn last name from list into string separated by spaces
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, Extension FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            try:
                info = next(cur)
                dispatcher.utter_message(text=f'''
                {info[0]} {info[1]}'s extension number is {info[2]}.  You can reach them at (905) 688-5550 x{info[2]}
                ''')
            except:
                dispatcher.utter_message(text="Sorry, I couldn't find that person.")

        else:
            dispatcher.utter_message(text="Sorry, I couldn't find that person.")
        return []

class ActionFacultyLocation(Action):
    def name(self) -> Text:
        return "action_faculty_location"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Faculty")
        faculty_name = False
        try:
            faculty_name = next(entity)
        except:
            pass

        # response
        if faculty_name:
            first_name = faculty_name.split(' ')[0]
            last_name = faculty_name.split(' ')[1:]
            last_name = " ".join(last_name) # turn last name from list into string separated by spaces
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, FacLocation FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            try:
                info = next(cur)
                dispatcher.utter_message(text=f'''
                You can find {info[0]} {info[1]} at {info[2]}.
                ''')
            except:
                dispatcher.utter_message(text="Sorry, I couldn't find that person.")

            
        else:
            dispatcher.utter_message(text="Sorry, I couldn't find that person.")
        return []

def normalize_course_code( course_input):
 course_code = course_input
 if  re.match("[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]\d[A-Za-z]\d\d", course_input): #eg: cosc1p02
     course_code = course_input[0:4] + ' ' + course_input[4:]
 return course_code

def get_day(day_input):
    if day_input == "M":
        return 'Monday'
    elif day_input == "T":
        return 'Tuesday'
    elif day_input == "W":
        return 'Wednesday'
    elif day_input == "R":
        return 'Thursday'
    elif day_input == "F":
        return 'Friday'

def get_location(location_input):
    return(location_input[10:])

def get_instructor(instructor_input):
    return(instructor_input[12:])

def get_prereq(prereq_input):
    return(prereq_input[16:])

def get_duration(location_input):
    if location_input =='D1':
        return ('Aug 30 - Apr 1')
    if location_input =='D2':
        return ('Sep 7 - Dec 8')
    if location_input =='D3':
        return ('Jan 10 - Apr 11')
    if location_input =='D4':
        return ('Aug 30 - Oct 8')
    if location_input =='D5':
        return ('Aug 30 - Nov 26')
    if location_input =='D6':
        return ('Aug 30 - Dec 17')
    if location_input =='D7':
        return ('Sep 7 - Oct 29')
    if location_input =='D8':
        return ('Sep 7 - Feb 12')
    if location_input =='D9':
        return ('Oct 18 - Nov 26')
    if location_input =='D10':
        return('Nov 1 - Dec 18')
    if location_input =='D11':
        return ('Jan 3 - Jan 28')
    if location_input =='D12':
        return ('Jan 4 - Feb 11')
    if location_input =='D13':
        return ('Jan 4 - Apr 1')
    if location_input =='D14':
        return ('Jan 31 - Mar 11')
    if location_input =='D15':
        return ('Jan 31 - Apr 29')
    if location_input =='D16':
        return ('Feb 16 - Apr 29')
    if location_input =='D17':
        return ('Mar 21 - Apr 29')
    if location_input =='D18':
        return ('Apr 2 - Apr 29')