##setup
cd frontend npm install
cd server npm install

download the deepspeech files: https://brocku-my.sharepoint.com/:f:/g/personal/ag17za_brocku_ca/Ekv0ZEXX_qtFr1nlMULxEtwBLq4k4YdLQYhzy1ohkhyHug?e=jQXKAr which will need to be placed in server/dist

##one time build 
cd frontend
npm run build

cd server 
node index


##build with instant hot reloading for front end changes
cd server
node index

cd frontend
npm start


##build with live reloading for front end changes and back end changes
cd frontend
npm run buildhot

cd server 
nodemon index
