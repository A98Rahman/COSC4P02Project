// imports
const express = require('express');
const path = require('path')

// setup
const app = express()
const port = 3000
app.use(express.static(path.join(__dirname, 'public'))); // use "public" directory for static files

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/chat.html'));
})

app.listen(port, () => {
  console.log(`Chat app listening on port ${port}`)
})