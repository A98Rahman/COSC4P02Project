import json


f = open('ProgramInfo.json')

data = json.load(f)

for i in data:
    print("- "+ i["Name"])

f.close()
