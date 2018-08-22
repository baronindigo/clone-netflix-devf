'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _users = require('./src/schemas/users');

var _users2 = _interopRequireDefault(_users);

var _genres = require('./src/schemas/genres');

var _genres2 = _interopRequireDefault(_genres);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _create = require('./src/resolvers/create');

var _verify = require('./src/resolvers/verify');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _graphql = require('./src/graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import React from 'react';
//import ReactDOM from 'react-dom';
//import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';

var jsonParser = _bodyParser2.default.json();

var app = (0, _express2.default)();

var PORT = process.env.PORT || 3000;

//mongoose.connect('mongodb://gabo:gabo2018@ds111492.mlab.com:11492/clone-netflix2018');
_mongoose2.default.connect('mongodb://carlos:carlos2018@ds113402.mlab.com:13402/clone-netflix2018');

var db = _mongoose2.default.connection;

db.on('error', function () {
    return console.log('Failed to connect to mongoDB');
}).once('open', function () {
    return console.log('Connected to MongoDB');
});

app.listen(PORT, function () {
    console.log('Server Works on port' + PORT);
});

app.use((0, _cors2.default)());

app.get('/', function (req, res) {});

app.get('/hola', function (req, res) {
    res.send("Hello hola");
});

app.get('/addUser', function (req, res) {
    var user = new _users2.default({
        "name": "TESTO",
        "lastName": "Testing",
        "email": "test@test.com",
        "password": "123456",
        "phone": "66226622"
    });

    user.save(function (err) {
        if (err) throw err;
        res.send('Usuario Creado');
    });
});

app.get('/addGenre', function (req, res) {
    var genre = new _genres2.default({
        "name": "ACTION",
        "description": "ACTION MOVIES"
    });

    genre.save(function (err) {
        if (err) throw err;
        res.send('Genre Creado');
    });
});

app.get('/userList', function (req, res) {
    _users2.default.find({ "name": "TESTO" }).then(function (users) {
        res.send(users);
    });
});

app.get('/genreList', function (req, res) {
    _genres2.default.find({}).then(function (genres) {
        res.send(genres);
    });
});

app.post('/register', jsonParser, function (req, res) {
    var user = new _users2.default(req.body);

    user.save(function (err) {
        if (err) throw err;
        res.send('Usuario Registrado');
    });
});

app.use('/login', jsonParser, function (req, res) {
    if (req.method === 'POST') {
        var token = (0, _create.createToken)(req.body.email, req.body.password).then(function (token) {
            res.status(200).json({ token: token });
        }).catch(function (err) {
            console.log(err, '<<<<<');
            res.status(403).json({
                message: 'Login FAILED invalid credentials'
            });
        });
    }
});

app.use('/verifyToken', jsonParser, function (req, res) {
    if (req.method === 'POST') {
        try {
            var token = req.headers['authorization'];
            (0, _verify.verifyToken)(token).then(function (user) {
                res.status(200).json({ user: user });
                console.log(err);
            }).catch(function (err) {
                console.log(err);
            });
        } catch (e) {
            console.log(e.message);
            res.status(401).json({
                message: e.message
            });
        }
    }
});

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

app.use('/graphql', (0, _expressGraphql2.default)(function (req, res) {
    return {
        schema: _graphql2.default,
        graphiql: true,
        pretty: true,
        context: {
            user: req.user
        }
    };
}));

//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();