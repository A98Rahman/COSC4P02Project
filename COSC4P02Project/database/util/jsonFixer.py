import sys

# print(sys.argv[1])

f = open(sys.argv[1],'r')

contents = f.read()

contents = "[" + contents + "]"

records = contents.split('}')

# print(records)

fixed = ""
counter = 0

for t in records:
    fixed += t
    counter = counter + 1

    if counter < len(records)-1:
        fixed += '},'
    elif counter == len(records)-1:
        fixed += '}'

# print(fixed)

output = open(sys.argv[1],'w')
output.truncate(0)

output.write(fixed)