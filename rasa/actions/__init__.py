import mariadb
import sys
import os

running_in_docker = os.environ.get('RUNNING_IN_DOCKER_CONTAINER', False)
print("__init__.py running_in_docker = " + str(running_in_docker), flush=True)

# Connect to MariaDB Platform
conn = None
if (running_in_docker):
	try:
		conn = mariadb.connect(
			user="root",
			password="chatbot",
			host="mariadb-service",
			port=3306,
			database="brockdb"
		)

	except mariadb.Error as e:
		print(f"Error connecting to MariaDB Platform: {e}")
		sys.exit(1)
else:
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