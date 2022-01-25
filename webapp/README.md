## Overview

The "webapp" folder contains the web app for the project.  It is an Express app, created with Node.js.

## Execution Instructions

### Step 1

Make sure Node and NPM are installed.  To get an instance of the web app running on your machine, make sure you have Node and NPM installed.

https://nodejs.org/en/download/

once you've finished installing Node and NPM, you can double check that they're installed by running the commands

"node -v" and "npm -v".

If they are properly installed, your version of node should show up.

### Step 2

Make sure the dependencies are installed

To install the dependencies, just navigate into the "webapp" directory within the project folder, and run the command

"npm install"

Once the dependencies finish installing, you should see a node_modules folder show up in the webapp folder.

### Step 3

Start the server

To run the server, double check that you are still in the webapp directory within the project folder, then run the command

"node app.js", 
or "nodemon app.js" if you're going to be working on the app.

The app should say "Chat app listening on port 3000", and you can access the web app from your browser by going to "localhost:3000"

## Folder Contents

### app.js

The app.js file is the most important part of the web app.  This contains the code for an express app which which will serve the website.

Think of the express app as the center of the project, where all of the pieces will fit together.

### /public 

This is where all of the "static assets" are served.  It's like the express app's local storage.

there are a few subdirectories in the public directory, each with a different purpose 
(ex. currently there is one for images and one for css files).

### /pages

This is where all of the static HTML pages are stored, for now.

Eventually we should have a more sophisticated way to hold HTML code, 
like using a templating engine or front-end framework like React.

### /node_modules

This is where all of the dependencies are stored.  You should never need to change anything inside this folder.

If you don't see this folder, use the command "npm install" to update your dependencies

NPM will fill up your node_modules based on what's listed in the package.json, so don't make changes to that either.

### package.json, package-lock.json

These files list all of the project's dependencies and other information about the project.
