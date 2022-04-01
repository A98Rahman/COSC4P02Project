import json
import glob

allfiles = glob.glob('*.json')

print(allfiles)

cleanedData = []
for file in allfiles:
    j = json.loads(open(file).read())
    isnull = False
    for rec in j:
        # print(rec)
        # print(cd'\n')
        # print(type(rec))
        for entry in rec:
            # print(entry)
            if rec[entry] == None :
                print(rec)
                isnull = True
                break
        
        if(isnull):
            print("Record is null")
            isnull = False
        else:
            cleanedData.append(rec)


output = open('sanitizedData.json','w')    
json.dump(cleanedData,output)
# output.write(str(cleanedData))

