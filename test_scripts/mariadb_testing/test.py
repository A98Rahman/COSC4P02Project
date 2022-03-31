import sys
import mariadb
import yake

def generate_keywords():
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

    cur = conn.cursor()

    cur.execute(
        "SELECT ClubName, ClubContact, ClubDesc FROM club;"
    )

    outlookup = open('LookupWithDuplicates.txt', 'w')
    outdb = open('ClubTable.txt', 'w')

    # make lookup table
    for item in cur:
        if item[0] and item[2]:
            keywords = kw_extractor(item[0] + " " + item[2])
            for kw in keywords:
                if kw[0] != 'Brock':
                    outlookup.write("- " + kw[0] + "\n")
           
        
    outlookup.close()
    outdb.close()

def kw_extractor(text):
    
    extractor = yake.KeywordExtractor()
    language = "en"
    max_ngram_size = 2
    deduplication_threshold = 0.8
    numOfKeywords = 10
    custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, top=numOfKeywords, features=None)
    keywords = custom_kw_extractor.extract_keywords(text)
    return keywords

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
        "SELECT ClubName FROM club;"
    )

    out = open('LookupWithDuplicates.txt', 'w')

    for item in cur:
        if item:
            words = item[0].split(" ")
            for w in words:
                out.write(f'- {w}\n')

def remove_duplicates():
    lines_seen = set() # holds lines already seen
    outfile = open('Lookup.txt', "w")
    for line in open('LookupWithDuplicates.txt', "r"):
        if line not in lines_seen: # not a duplicate
            outfile.write(line)
            lines_seen.add(line)
    outfile.close()

def main():
    generate_lookup()
    remove_duplicates()

if __name__ == "__main__":
    main()