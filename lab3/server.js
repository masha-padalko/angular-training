var express = require('express');
var app = express();


app.use(express.static('static'));

app.listen(3000);

app.get("/notes", function(req,res) {
    var notes = [
        {text: "First note"},
        {text: "Second note"},
        {text: "Third note"}
    ];
    res.send(notes);
});