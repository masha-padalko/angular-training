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
});


app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));


app.get("/notes", function(req,res)
{

    db.notes.find(req.query).toArray(function(err, items) {
        console.log(JSON.stringify(items));
        res.send(items);
    });
});

app.get("/totop", function(req,res)
{

    db.notes.find(req.query).toArray(function(err, items) {
        console.log(JSON.stringify(items));
        res.send(items);
    });
    // var noteID = req.query.id;
    // var note = db.notes.find().sort( { order: -1 } ).limit(1);
    //     var minOrderNum = note.order;
    //     update _note_where_id = noteId_set_order(minOrderNum)
    // get all notes and set to the client
});

app.post("/notes", function(req, res)
{
    db.notes.insert(req.body);
    res.end();

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

app.listen(3000);