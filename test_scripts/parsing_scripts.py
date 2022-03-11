import json

def parse_JSON_to_YML():
    f = open('CourseInfo.json')
    w = open('CourseLookup.txt', 'w')

    data = json.load(f)

    for i in data:
        w.write("- "+ i["course_name"]+ "\n")

    f.close()

def remove_duplicates():
    lines_seen = set() # holds lines already seen
    outfile = open('CourseLookupNew.txt', "w")
    for line in open('CourseLookup.txt', "r"):
        if line not in lines_seen: # not a duplicate
            outfile.write(line)
            lines_seen.add(line)
    outfile.close()

def main():
    parse_JSON_to_YML()

if __name__ == "__main__":
    main()
