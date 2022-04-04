## setup
cd frontend npm install <br/>
cd server npm install

download the deepspeech files: https://brocku-my.sharepoint.com/:f:/g/personal/ag17za_brocku_ca/Ekv0ZEXX_qtFr1nlMULxEtwBLq4k4YdLQYhzy1ohkhyHug?e=jQXKAr which will need to be placed in server/dist

## one time build
cd frontend<br/>
npm run build<br/>

cd server <br/>
node index<br/>


## build with instant hot reloading for front end changes
cd server<br/>
node index

cd frontend<br/>
npm start


## build with live reloading for front end changes and back end changes
cd frontend<br/>
npm run buildhot

cd server <br/>
nodemon index
