# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from pymongo import MongoClient
from typing import Any, Text, Dict, List
import json

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from sqlalchemy import desc

class ActionCourseInfo(Action):

    def name(self) -> Text:
        return "action_course_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        course_entity = tracker.get_latest_entity_values(entity_type="Course")
        course_entity = next(course_entity)

        # response
        if course_entity:
            description = get_field_from_JSON(course_entity, "course_name", "course_description", "CourseInfo")
            dispatcher.utter_message(text=f'Yes, we offer {course_entity}, here\'s some information about that course')
            dispatcher.utter_message(text=f'{description}')
        else:
            dispatcher.utter_message(text="Sorry, I couldn't find that course, here's a link to our catalog of courses:")
            dispatcher.utter_message(text="https://brocku.ca/webcal/2021/undergrad")

        return []

class ActionProgramInfo(Action):

    def name(self) -> Text:
        return "action_program_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        program_entity = tracker.get_latest_entity_values(entity_type="Program")
        program_entity = next(program_entity)

        # response
        if program_entity:
            link = get_field_from_JSON(program_entity, "Name", "Link", "ProgramInfo")
            dispatcher.utter_message(text=f'Yes, we offer {program_entity}, here\'s a link to the page: {link}')
        else:
            dispatcher.utter_message(text="I couldn't find that program")

        return []

class ActionClubInfo(Action):

    def name(self) -> Text:
        return "action_club_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="Club")
        entity = next(entity)

        # response
        if entity:
            description = get_field_from_JSON(entity, "club_name", "club_description", "ClubInfo")
            dispatcher.utter_message(text=f'You should check out our {entity}, here\'s a bit of information about them:')
            dispatcher.utter_message(text=f'{description}')
        else:
            dispatcher.utter_message(text="I couldn't find that program")

        return []

class ActionProgramInfo(Action):

    def name(self) -> Text:
        return "action_program_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        program_entity = tracker.get_latest_entity_values(entity_type="Program")
        program_entity = next(program_entity)

        # response
        if program_entity:
            link = get_field_from_JSON(program_entity, "Name", "Link", "ProgramInfo")
            dispatcher.utter_message(text=f'Yes, we offer {program_entity}, here\'s a link to the page: {link}')
        else:
            dispatcher.utter_message(text="I couldn't find that program")

        return []

class ActionExamGeneralInfo(Action):
    def name(self) -> Text:
        return "action_exam_general_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        entity = tracker.get_latest_entity_values(entity_type="CourseCode")
        entity = next(entity)

        # response
        if entity:
            description = get_field_from_JSON(entity, "course_code", "exam_date", "ACTG_exams")  #key, key name, field name,file (no .json)
            dispatcher.utter_message(text=f'The exam for {entity} will be held at: {description}')
        else:
            dispatcher.utter_message(text="I couldn't find that exam")
        return []

# get the proper field from the JSON file.  
# Should eventually come from Mongo
# maybe eventually re-write this to return an array of field_names
def get_field_from_JSON(key, key_name, field_name, file_name):
    f = open(f'C:/Users/User/Desktop/Chatbot/COSC4P02Project/rasa/actions/{file_name}.json')

    data = json.load(f)

    for i in data:
        if i[key_name]: 
            if key.lower() == i[key_name].lower():
                return i[field_name]

    f.close()
    return None

