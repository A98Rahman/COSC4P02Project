// imports
const express = require('express');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// express app setup
const app = express()
const port = 3000

// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());

// middleware that sets a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.userID;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomID = uuidv4();
    res.cookie('userID',randomID, { maxAge: (1000* 60 * 60), httpOnly: true }); //maxage - cookies (and as a result, chat instances) only last for one hour
  } else {
    // do nothing, cookie was already present 
  } 
  next(); // <-- important!
});

app.use(express.static(path.join(__dirname, 'public'))); // use "public" directory for static files

// cors setup for express app
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// other express configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json( { limit: '1mb' }));
app.use(cors(corsOptions));

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/chat.html'));
})

app.post('/chat', async (req, res) => {
  const message = req.body.message;

  await fetch('http://localhost:5005/webhooks/rest/webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender: req.cookies.userID, message: message })
  })
  .then(response => response.json())
  .then(data => res.send(data));
}) 

app.listen(port, () => {
  console.log(`Chat app listening on port ${port}`)
})