const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const database = process.env.DATABASE_URL;
const port = process.env.PORT;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';
const db = require('knex')({
  client: 'pg',
  connection: {
	connectionString: process.env.DATABASE_URL,
	}
  });

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();


app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(port, ()=> {
	console.log(`app is running on port ${port}`)
})


