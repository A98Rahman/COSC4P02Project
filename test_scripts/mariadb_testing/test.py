import sys
import mariadb

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
    "SELECT CrsCode, ExamDate FROM exam;"
)

for item in cur:
    print(item)