const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));


app.get('/bad', (req, res) => {
  // if key is empty, we send to bad request page
  if ( !req.query.key ) {
    res.sendFile(path.join(__dirname, 'views/500.html'));
  } else res.send({message: 'Success!'});
})

// Returns boolean based on if a string is a valid email address
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

app.post('/corrupt', (req, res) => {
  if ( !validateEmail(req.body.email) )
    res.sendFile(path.join(__dirname, 'views/400.html'));
  else res.redirect('/');
});

app.use((req, res) => res.sendFile(path.join(__dirname, 'views/404.html')));

app.listen(5000, () => console.log('Listening on 5000...'));