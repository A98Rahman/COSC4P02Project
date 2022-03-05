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

class ActionCourseInfo(Action):

    def name(self) -> Text:
        return "action_course_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        client = MongoClient('mongodb+srv://RasaApp:Chatbot123@cluster0.phnw6.mongodb.net/myFirstDatabase?retryWrites=true')
        db = client["BrockInfo"] # db holds "BrockInfo" database
        courses = db.get_collection("Courses")
        course = courses.find_one({"course_code": "COSC3P03"})

        # response
        if course:
            dispatcher.utter_message(text=f'{course["course_name"]} is taught by {course["instructor"]}')
        else:
            dispatcher.utter_message(text="I couldn't find that course")

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
            link = get_program_link(program_entity)
            dispatcher.utter_message(text=f'Yes, we offer {program_entity}, here\'s a link to the page: {link}')
        else:
            dispatcher.utter_message(text="I couldn't find that program")

        return []

# get the program link from the JSON file.  
# Should eventually come from Mongo
def get_program_link(program_name):
    f = open('/home/ray/Code/chatbot/rasa/actions/ProgramInfo.json')

    data = json.load(f)

    for i in data:
        if program_name.lower() == i["Name"].lower():
            return i["Link"]

    f.close()
    return None