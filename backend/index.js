
import express from 'express';
import mongoose from 'mongoose';
import User from './src/schemas/users';
import Genre from './src/schemas/genres';
import bodyParser from 'body-parser';
import { createToken } from './src/resolvers/create';
import { verifyToken } from './src/resolvers/verify';
import graphQLHTTP from "express-graphql";
import schema from './src/graphql';
import cors from 'cors';


//import React from 'react';
//import ReactDOM from 'react-dom';
//import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';

const jsonParser = bodyParser.json();

const app = express();

const PORT = process.env.PORT || 3000 ;

//mongoose.connect('mongodb://gabo:gabo2018@ds111492.mlab.com:11492/clone-netflix2018');
mongoose.connect('mongodb://carlos:carlos2018@ds113402.mlab.com:13402/clone-netflix2018');

const db = mongoose.connection;

db.on('error',() => console.log('Failed to connect to mongoDB'))
    .once('open',()=> console.log('Connected to MongoDB'));

app.listen(PORT, () => {
    console.log('Server Works on port' +PORT);
})

app.use((cors()));

app.get('/', (req,res) => {
    
});



app.get('/hola', (req,res) => {
    res.send("Hello hola");
});

app.get('/addUser', (req,res) => {
    var user = new User({
        "name":"TESTO",
        "lastName":"Testing",
        "email": "test@test.com",
        "password": "123456",
        "phone": "66226622"
    });

    user.save((err)=> {
        if(err) throw err
        res.send('Usuario Creado'); 
    })
})

app.get('/addGenre', (req,res) => {
    var genre = new Genre({
        "name":"ACTION",
        "description": "ACTION MOVIES"
    });

    genre.save((err)=> {
        if(err) throw err
        res.send('Genre Creado'); 
    })
})

app.get('/userList', function(req,res){
    User.find({"name":"TESTO"}).then(function(users){
        res.send(users);
    })
})

app.get('/genreList', function(req,res){
    Genre.find({}).then(function(genres){
        res.send(genres);
    })
})

app.post('/register', jsonParser, (req,res)=> {
    var user = new User(req.body);

    user.save((err)=>{
        if(err) throw err;
        res.send('Usuario Registrado');

    })
})

app.use('/login', jsonParser, (req, res) => {
    if (req.method === 'POST') {
        const token = createToken(req.body.email, req.body.password).then((token) => {
            res.status(200).json({token});
        })
        .catch((err) => {
            console.log(err, '<<<<<');
            res.status(403).json({
                message: 'Login FAILED invalid credentials'
            })
        })
    }
})

app.use('/verifyToken', jsonParser, (req, res) => {
    if(req.method === 'POST'){
        try {
            const token = req.headers['authorization']
            verifyToken(token)
            .then(user => {
                res.status(200).json({user})
                console.log(err);
            })
            .catch(err => {
                console.log(err);
            })
        } catch(e) {
            console.log(e.message);
            res.status(401).json({
                message:e.message
            })
        }
    }
})

// Middleare
/*
app.use('/graphql', (req, res, next) => {
    const token = req.headers['authorization']

    try {
        req.user = verifyToken(token)
        next();
    } catch(e) {
        res.status(401).json({
            message: e.message
        })
    }
});*/

app.use('/graphql', graphQLHTTP((req, res) => ({
    schema,
    graphiql: true,
    pretty : true,
    context : {
        user: req.user
    }
})))


//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();