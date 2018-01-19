var express = require('express'),
    bodyParser = require('body-parser')
app = express();
var path = require('path');
var dataStore = require('nedb');
var JARVISSEIT = require('./app/jarvisSEIT.js');
var JARVIS = require('./app/jarvis.js');
var timetables = require('./app/timetable.js');


var users = new dataStore({ filename: path.join(__dirname, 'db', 'users') });
users.loadDatabase();

var todos = new dataStore({ filename: path.join(__dirname, 'db', 'todos') });
todos.loadDatabase();

JARVIS.trainSubject();
JARVIS.trainType();
JARVIS.trainDays();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'node_modules')));

app.get(['/', '/login', '/overview', '/register'], function (req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/register.html', function (req, res) {
    console.log("got a Request")
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/app/app.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'app', 'app.js'));
});

app.get('/training', function (req, res) {
    res.sendFile(path.join(__dirname, 'training.html'));
});

app.get('/login.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/overview.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'overview.html'));
});

app.get('/unOrdinary.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'unOrdinary.html'));
});

app.post('/getToDo', function (req, res) {
    if (req.body.userID !== undefined) {
        todos.find({ userID: req.body.userID }, function (err, todo) {
            res.json(todo);
        });
    }
});

app.post('/login', function (req, res) {
    /*    var student = {
            user: "dhruvdh",
            pass: "2704",
            dept: "INFT",
            year: "TE",
            div: "A",
            batch: "2",
            rollNo: "29",
            semester: "6",
            name: "Dhruv Dhamani",
            PID: "141012",
        };*/
    var id, timetable, username, name, batch, toDoList = [];
    console.log(req.body)

    if (req.body.password) {
        users.find({ "user": req.body.username, "pass": req.body.password }, function (err, user) {
            if (req.body.password == undefined)
                res.sendStatus(403);
            if (err)
                res.sendStatus(403);
            else if (user[0]) {
                id = user[0]._id;
                username = user[0].user;
                name = user[0].name;
                batch = user[0].batch;
                timetable = timetables[user[0].dept + "/" + user[0].year + "/" + user[0].div];
            }
            todos.find({ userID: id }, function (err, todo) {
                res.json({
                    "id": id,
                    "username": username,
                    "name": name,
                    "batch": batch,
                    "timetable": timetable,
                    "toDoList": todo
                });
            });
        });
    }
    else if (req.body.userID) {
        users.find({ "user": req.body.username, "_id": req.body.userID }, function (err, user) {

            if (err)
                res.sendStatus(403);
            else if (user[0]) {
                id = user[0]._id;
                username = user[0].user;
                name = user[0].name;
                batch = user[0].batch;
                timetable = timetables[user[0].dept + "/" + user[0].year + "/" + user[0].div];
            }
            todos.find({ userID: id }, function (err, todo) {
                res.json({
                    "id": id,
                    "username": username,
                    "name": name,
                    "batch": batch,
                    "timetable": timetable,
                    "toDoList": todo
                });
            });
        });
    }
});

app.post('/training', function (req, res) {
    users.find({ _id: req.body._id }, function (err, user) {
        console.log("found user: " + user);
        console.log('Request id: ' + req.body._id)
        console.log('Request query: ' + req.body.query)
        todos.find({ userID: req.body._id }, function (err, toDo) {
            var tuple = {
                userID: req.body._id,
                query: req.body.query,
                subject: JARVIS.getSubject(req.body.query),
                type: JARVIS.getType(req.body.query),
                day: JARVIS.getDay(req.body.query, timetables[user[0].dept + "/" + user[0].year + "/" + user[0].div], user[0].batch),
                ordinals: JARVIS.getOrdinal(req.body.query),
            };
            todos.insert(tuple, function (err, todo) {
                res.json({
                    subject: todo.subject,
                    type: todo.type,
                    day: todo.day,
                    ordinals: todo.ordinals,
                    toDoList: toDo,
                    reply: JARVIS.getReply(req.body.query, todo)
                })
            })
        })
    });
});




app.get('/trainingSEIT', function (req, res) {
    res.sendFile(path.join(__dirname, 'trainingSEIT.html'));
});


app.post('/trainingSEIT', function (req, res) {
    if (req.body.query) {
        JARVISSEIT.trainSubject();
        JARVISSEIT.trainType();
        JARVISSEIT.trainDays();

        res.json({
            subject: JARVISSEIT.getSubject(req.body.query),
            type: JARVISSEIT.getType(req.body.query),
            day: JARVISSEIT.getDay(req.body.query),
            ordinals: JARVISSEIT.getOrdinal(req.body.query)
        });
    }
});

app.post('/register', function (req, res) {
    users.insert({
        user: req.body.user,
        pass: req.body.pass,
        dept: "INFT",
        year: "TE",
        div: "A",
        batch: req.body.batch,
    }, function (err, user) {
        if (!err)
            res.sendStatus(200);
    });
});
var server = app.listen(process.env.PORT || '3000', function () {
    //classifier.addDocument('write se experiment 2', 'Write');
    console.log('The servers up yo.');
});