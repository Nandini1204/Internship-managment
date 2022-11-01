const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./config/passport')
require('dotenv').config();
app.use(cors())
const mongoose = require("mongoose");


app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use(cookieSession({
    maxAge:24*60*60*1000,
    name: 'Shauping',
    keys: [process.env.key]
  }))

app.use(passport.initialize());
app.use(passport.session());

const db = process.env.db

mongoose
        .connect(db, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));

        
app.get('/', (req, res) => res.send('Example Home page!'))
app.use('/',require("./routes/auth"));

app.listen(process.env.PORT || 3001, () => console.log(`Example app listening on port ${3001}!`))
