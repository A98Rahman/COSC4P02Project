# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from typing import Any, Text, Dict, List

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

#########################
##### EXAM ACTIONS ######
#########################

class ActionExamGeneralInfo(Action):
    def name(self) -> Text:
        return "action_exam_general_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        course_code = tracker.get_slot('CourseCode')
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
        course_code = tracker.get_slot('CourseCode')
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
        course_code = tracker.get_slot('CourseCode')
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
        course_code = tracker.get_slot('CourseCode')
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
                Yes, {info[0]} {info[1]} is a {info[2]} here at Brock.  They can be reached at {info[3]} or extension number {info[4]}.  Their office is located at {info[5]}.
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

