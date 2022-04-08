## setup
cd frontend<br/>
npm install<br/>

cd server<br/>
npm install<br/>

cd rasa<br/>
rasa train<br/>

download the deepspeech files: https://brocku-my.sharepoint.com/:f:/g/personal/ag17za_brocku_ca/Ekv0ZEXX_qtFr1nlMULxEtwBLq4k4YdLQYhzy1ohkhyHug?e=jQXKAr (or get them from mozilla) which will need to be placed in server/dist

## running the site with live reloading
cd rasa<br/>
rasa run<br/>
rasa run actions<br/>

cd server<br/>
npx nodemon index<br/>

cd frontend<br/>
npm start<br/>