var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 5555;

var indexRouter = require('./routes/index');
var petsRouter = require('./routes/pets');


app.use(express.static('public'));
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/pets', petsRouter);

app.listen(port, function(){
    console.log('listening on port:', port);
});
