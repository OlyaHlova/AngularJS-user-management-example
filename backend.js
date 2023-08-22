import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

var users = [
    {
        id: 1,
        userName: 'AlfredsFutterkiste1',
        firstName: 'Alfreds',
        lastName: 'Futterkiste',
        email: 'alfredsfutterkiste@gmail.com',
        type: 'Administrator'
    },
    {
        id: 111,
        userName: 'AlfredsFutterkiste12',
        firstName: 'Alfreds',
        lastName: 'Futterkiste',
        email: 'alfredsfutterkiste@gmail.com',
        type: 'Administrator'
    },
    {
        id: 4,
        userName: 'alfredsFutter4',
        firstName: 'Alfreds',
        lastName: 'Futter',
        email: 'alfredsfutter@gmail.com',
        type: 'Administrator'
    },
    {
        id: 2,
        userName: 'AlfFutter2',
        firstName: 'Alf',
        lastName: 'Futter',
        email: 'alffutter@gmail.com',
        type: 'User'
    },
    {
        id: 8,
        userName: 'CentroComercialMoctezuma8',
        firstName: 'centro',
        lastName: 'Comercialmoctezuma',
        email: 'centroComercialMoctezuma@gmail.com',
        type: 'User'
    },
    {
        id: 11,
        userName: 'AlfredsFutterkiste',
        firstName: 'Alfreds',
        lastName: 'Futterkiste',
        email: 'alfredsfutterkis44@gmail.com',
        type: 'Administrator'
    },
    {
        id: 14,
        userName: 'alfredsFutter47',
        firstName: 'Alfreds',
        lastName: 'Futter',
        email: 'alfredsfutter44@gmail.com',
        type: 'Administrator'
    },
    {
        id: 12,
        userName: 'AlfFutter22',
        firstName: 'Alf',
        lastName: 'Futter',
        email: 'alffutter44@gmail.com',
        type: 'User'
    },
    {
        id: 18,
        userName: 'CentroComercialMoctezuma82',
        firstName: 'centro',
        lastName: 'Comercialmoctezuma',
        email: 'centroComercialMoctea@gmail.com',
        type: 'User'
    }
];

app.get('/users', function (req, res) {
  res.send(users);
});

// Fetch a single user by userName
app.get('/users/:userName', function (req, res) {
    const userName = req.params.userName;
    const user = users.find(user => user.userName === userName);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404); // User not found
    }
});

app.post('/users', function(req, res) {
    users.push({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.flastName,
        email: req.body.femail,
        type: req.body.type
    });
    res.sendStatus(200);
});

app.put('/users/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const updatedUser = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type: req.body.type
    };

    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users[index] = { id, ...updatedUser };
        res.sendStatus(200);
    } else {
        res.sendStatus(404); // User not found
    }
});

app.delete('/users/:id', function(req, res) {
    const id = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404); // User not found
    }
});

var server = app.listen(3002, function () {
  console.log('backend started');
});