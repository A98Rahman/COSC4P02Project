import json

from itsdangerous import exc

def parse_JSON_to_YML():
    f = open('ClubInfo.json')
    w = open('ClubLookup.txt', 'w')

    data = json.load(f)

    for i in data:
        w.write("- "+ i["club_name"]+ "\n")

    f.close()

def remove_duplicates():
    lines_seen = set() # holds lines already seen
    outfile = open('CourseLookupNew.txt', "w")
    for line in open('CourseLookup.txt', "r"):
        if line not in lines_seen: # not a duplicate
            outfile.write(line)
            lines_seen.add(line)
    outfile.close()

def parse_clubs_text_data():
    f = open('clubs.txt', 'r')
    w = open('ClubInfo.json', 'w')

    w.write("[{")

    counter = 0

    for i in f:
        try:
            if "/-/" in i:
                nextbracket = "{"
                w.write(nextbracket)
            elif i[5] == "N":
                club_name = i[11:].strip()
                club_name = club_name.replace("'", "")
                w.write(f'\"club_name\": \"{club_name}\",')
            elif i[5] == "D":
                club_description = i[18:].strip()
                w.write(f'\"club_description\": \"{club_description}\"')
                nextbracket = "},\n"
                w.write(nextbracket)
            
        except:
            print('error')
        counter += 1

    w.write("]")

    w.close()
    f.close()


def main():
    parse_JSON_to_YML()

if __name__ == "__main__":
    main()
