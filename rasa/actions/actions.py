# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from pymongo import MongoClient
from typing import Any, Text, Dict, List
import json

import mariadb
import sys

from rasa_sdk import Action, Tracker
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

# class ActionCourseInfo(Action):

#     def name(self) -> Text:
#         return "action_course_info"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

#         course_entity = tracker.get_latest_entity_values(entity_type="Course")
#         course_entity = next(course_entity)

#         # response
#         if course_entity:
#             description = get_field_from_JSON(course_entity, "course_name", "course_description", "CourseInfo")
#             dispatcher.utter_message(text=f'Yes, we offer {course_entity}, here\'s some information about that course')
#             dispatcher.utter_message(text=f'{description}')
#         else:
#             dispatcher.utter_message(text="Sorry, I couldn't find that course, here's a link to our catalog of courses:")
#             dispatcher.utter_message(text="https://brocku.ca/webcal/2021/undergrad")

#         return []

# class ActionProgramInfo(Action):

#     def name(self) -> Text:
#         return "action_program_info"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

#         program_entity = tracker.get_latest_entity_values(entity_type="Program")
#         program_entity = next(program_entity)

#         # response
#         if program_entity:
#             link = get_field_from_JSON(program_entity, "Name", "Link", "ProgramInfo")
#             dispatcher.utter_message(text=f'Yes, we offer {program_entity}, here\'s a link to the page: {link}')
#         else:
#             dispatcher.utter_message(text="I couldn't find that program")

#         return []

# class ActionClubInfo(Action):

#     def name(self) -> Text:
#         return "action_club_info"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

#         entity = tracker.get_latest_entity_values(entity_type="Club")
#         entity = next(entity)

#         # response
#         if entity:
#             description = get_field_from_JSON(entity, "club_name", "club_description", "ClubInfo")
#             dispatcher.utter_message(text=f'You should check out our {entity}, here\'s a bit of information about them:')
#             dispatcher.utter_message(text=f'{description}')
#         else:
#             dispatcher.utter_message(text="I couldn't find that program")

#         return []

# class ActionProgramInfo(Action):

#     def name(self) -> Text:
#         return "action_program_info"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

#         program_entity = tracker.get_latest_entity_values(entity_type="Program")
#         program_entity = next(program_entity)

#         # response
#         if program_entity:
#             link = get_field_from_JSON(program_entity, "Name", "Link", "ProgramInfo")
#             dispatcher.utter_message(text=f'Yes, we offer {program_entity}, here\'s a link to the page: {link}')
#         else:
#             dispatcher.utter_message(text="I couldn't find that program")

#         return []

class ActionExamGeneralInfo(Action):
    def name(self) -> Text:
        return "action_exam_general_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="CourseCode")
        course_code = next(entity)

        # response
        if course_code:
            cur = conn.cursor()
            cur.execute(
                "SELECT CrsCode, ExamDate, ExamStartTime, ExamEndTime, ExamLocation FROM exam WHERE CrsCode=?;",
                (course_code,)
            )

            exam_info = next(cur)

            dispatcher.utter_message(text=f'''
            The exam for {exam_info[0]} will be held on {exam_info[1]}, from {exam_info[2]} to {exam_info[3]}, at {exam_info[4]}
            ''')
        else:
            dispatcher.utter_message(text="I couldn't find that exam")
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
        name = next(entity)
        first_name = name.split(' ')[0]
        last_name = name.split(' ')[1:]
        last_name = " ".join(last_name) # turn last name from list into string separated by spaces

        # response
        if name:
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, Title, Email, Extension, FacLocation FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            info = next(cur)

            dispatcher.utter_message(text=f'''
            Yes, {info[0]} {info[1]} is a {info[2]} here at Brock.  They can be reached at {info[3]} or extension number {info[4]}.  Their office is located at {info[5]}.
            ''')
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
        name = next(entity)
        first_name = name.split(' ')[0]
        last_name = name.split(' ')[1:]
        last_name = " ".join(last_name) # turn last name from list into string separated by spaces

        # response
        if name:
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, FacDept FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            info = next(cur)

            dispatcher.utter_message(text=f'''
                {info[0]} {info[1]} works in {info[2]}
            ''')
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
        name = next(entity)
        first_name = name.split(' ')[0]
        last_name = name.split(' ')[1:]
        last_name = " ".join(last_name) # turn last name from list into string separated by spaces

        # response
        if name:
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, Email FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            info = next(cur)

            dispatcher.utter_message(text=f'''
                {info[0]} {info[1]}'s email is {info[2]}
            ''')
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
        name = next(entity)
        first_name = name.split(' ')[0]
        last_name = name.split(' ')[1:]
        last_name = " ".join(last_name) # turn last name from list into string separated by spaces

        # response
        if name:
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, Title FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            info = next(cur)

            dispatcher.utter_message(text=f'''
                {info[0]} {info[1]}'s official title is {info[2]}
            ''')
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
        name = next(entity)
        first_name = name.split(' ')[0]
        last_name = name.split(' ')[1:]
        last_name = " ".join(last_name) # turn last name from list into string separated by spaces

        # response
        if name:
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, Extension FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            info = next(cur)

            dispatcher.utter_message(text=f'''
                {info[0]} {info[1]}'s extension number is {info[2]}.  You can reach them at (905) 688-5550 x{info[2]}
            ''')
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
        name = next(entity)
        first_name = name.split(' ')[0]
        last_name = name.split(' ')[1:]
        last_name = " ".join(last_name) # turn last name from list into string separated by spaces

        # response
        if name:
            cur = conn.cursor()
            cur.execute(
                "SELECT FirstName, LastName, FacLocation FROM Faculty WHERE FirstName=? and LastName=?;",
                (first_name, last_name)
            )

            info = next(cur)

            dispatcher.utter_message(text=f'''
                You can find {info[0]} {info[1]} at {info[2]}.
            ''')
        else:
            dispatcher.utter_message(text="Sorry, I couldn't find that person.")
        return []

# # get the proper field from the JSON file.  
# # Should eventually come from Mongo
# # maybe eventually re-write this to return an array of field_names
# def get_field_from_JSON(key, key_name, field_name, file_name):
#     f = open(f'C:/Users/User/Desktop/Chatbot/COSC4P02Project/rasa/actions/{file_name}.json')

#     data = json.load(f)

#     for i in data:
#         if i[key_name]: 
#             if key.lower() == i[key_name].lower():
#                 return i[field_name]

#     f.close()
#     return None

