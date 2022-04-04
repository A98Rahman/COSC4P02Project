##setup
cd frontend npm install
cd server npm install

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
