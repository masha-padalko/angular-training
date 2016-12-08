var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

var db = new Db('tutor',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));
db.open(function(){
    console.log("mongo db is opened!");
    db.collection('notes', function(error, notes) {
        db.notes = notes;
    });
    db.collection('sections', function(error, sections) {
        db.sections = sections;
    });
});

app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

//NOTES

app.get("/notes", function(req,res)
{
    console.log(JSON.stringify(req.query))
    db.notes.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});

app.delete("/notes", function(req,res) {
    var id = new ObjectID(req.query.id);
    db.notes.remove({_id: id}, function(err){
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});


app.post("/notes", function(req, res)
{
    db.notes.insert(req.body);
    res.end();
});

//SECTIONS

app.get("/sections", function(req,res) {
    db.sections.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});

app.post("/sections/replace", function(req,resp) {
// do not clear the list
    if (req.body.length==0) {
        resp.end();
    }
    db.sections.remove({}, function(err, res) {

        db.sections.insert(req.body, function(err, res) {
            if (err) console.log("err after insert",err);
            resp.end();
        });
    });
});


app.listen(3000);