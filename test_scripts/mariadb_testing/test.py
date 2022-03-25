import sys
import mariadb

def generate_lookup():
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

    # Get Cursor
    cur = conn.cursor()

    cur.execute(
        "SELECT FirstName, LastName FROM faculty;"
    )

    out = open('LookupWithDuplicates.txt', 'w')

    for item in cur:
        if item[0]:
            out.write(f'- {item[0]} {item[1]}\n')

def remove_duplicates():
    lines_seen = set() # holds lines already seen
    outfile = open('Lookup.txt', "w")
    for line in open('LookupWithDuplicates.txt', "r"):
        if line not in lines_seen: # not a duplicate
            outfile.write(line)
            lines_seen.add(line)
    outfile.close()

def main():
    name = "Robson De Grande"
    first_name = name.split(' ')[0]
    last_name = name.split(' ')[1:]
    last_name = " ".join(last_name) # turn list into string

    print(first_name, last_name)
    # generate_lookup()
    # remove_duplicates()
if __name__ == "__main__":
    main()