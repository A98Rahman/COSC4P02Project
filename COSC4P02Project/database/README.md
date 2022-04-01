This guide is going to detail the steps to install MariaDb locally on your machine and initialise BrockDb.

Start by downloading the MariaDb server application. I downloaded version 10.7.3 so that would probably work best. 
https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.7.3&os=windows&cpu=x86_64&pkg=msi&m=acorn

When you install you have to type in a password for a user. By default the user name is root so keep it that way.
Set the password to be something short and simple. I set mine as 'chatbot'

Depending on where you installed it you will have to add the bin folder to your PATH variable. 
Default directory is "C:\Program Files\MariaDB 10.7\bin"
This is important because it will let you access MariaDb from your cmd. 

The command to start MariaDb server on your cmd is "mysql"
Start your command line and type the following command
"mysql -u root -p" 
Running this will prompt you for your password that you set during installation. Enter the password and hit enter. 

Now you can access MariaDb as a root user and do whatever you need to do on the local server. 

Some usefull commands are (note: adding a semi colon at the end of the command is crucial or else it will become a multi line command. To exit multiline cmds enter ;):
SHOW DATABASES; //Shows all the databases on the server
USE databasename; //You need to select what database you want to run queries on 
SHOW TABLES; //Shows all the tables on the currently selected database
DROP DATABASE databaseName; //Delete a database
CREATE DATABASE databseName; //Create a new database 
SELECT * FROM tableName; //Prints all the records a table

Once you are in the mysql command line and you are logged in follow the steps below to initialize the databse server.
Make sure you open the cmd in the \COSC4P02Project\database folder because thats where the "db_init.sql" script is located in. 
In the mysql cmd type in the following commands. 
    CREATE DATABASE brockdb;
    USE brockdb;
    source db_init.sql

These steps should return messages saying that QUERY OK and the last two messages would say 250 rows affected.

Now you have successfully installed the sql database locally. 