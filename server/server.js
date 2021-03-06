const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'facerecognition'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const register = require('./controllers/register');

app.get('/', (req, res) => {
    res.json(database.users)
})

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if(user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('error getting user')
            }
        })
})

app.put('/image', (req, res) => {
    const { id, facesCount } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', facesCount)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
    // let found = false;
    // database.users.forEach(user => {
    //     if(user.id === id) {
    //         found = true;
    //         user.entries = user.entries + facesCount;
    //         return res.json(user.entries);
    //     }
    // })
    // if(!found) {
    //     res.status(404).json('no such user')
    // }
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000')
})
