from pymongo import MongoClient

def populate_database(db):
    #this function seeds the database with data from 'courses.txt'
    # NOTE: this will delete everything in the collection

    db.get_collection("Courses").delete_many({})
    courses = db.get_collection("Courses")
    course_data = open('courses.txt')
    for i in range(5):
        course_code = course_data.readline().strip('\n')
        course_name = course_data.readline().strip('\n')
        instructor_name = course_data.readline().strip('\n')
        course = {
            "course_name": course_name,
            "course_code": course_code,
            "instructor": instructor_name
        }
        courses.insert_one(course)

def find_course(db, course_code):
    courses = db.get_collection("Courses")
    course = courses.find_one({"course_code": course_code})
    if course:
        print(f'{course["course_name"]} is taught by {course["instructor"]}')
    else:
        print('I could not find that course')

def main():
    # connect to Mongo Atlas
    client = MongoClient('mongodb+srv://RasaApp:Chatbot123@cluster0.phnw6.mongodb.net/myFirstDatabase?retryWrites=true')
    
    db = client["BrockInfo"] # db holds "BrockInfo" database
    
    find_course(db, "COSC3P03")    
    
if __name__ == "__main__":
    main()