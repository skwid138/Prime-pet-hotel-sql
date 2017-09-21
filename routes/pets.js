var router = require('express').Router();
var bodyParser = require('body-parser');
var pool = require('./pool');

router.get('/', function (req, res){
    console.log('in get pets');
    pool.connect( function(err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        }//END if err
        else{
            client.query('SELECT * FROM pets', function (quErr, resObj){
                done();
                if(quErr){
                    console.log('query error');
                    res.sendStatus(500); 
                }//END if quErr
                else{
                    res.send(resObj.rows);
                }//END else
            });//END client.query
         }//END else no err
    })//END pool connect
})//END get

router.post('/', function(req, res) {
    console.log('in pet post', req.body);
    var petname = req.body.petname;
    var breed = req.body.breed;
    var color = req.body.color;
    var checkedin = req.body.checkedin;
    var petArr = [petname, breed, color, checkedin];
    pool.connect( function(err, client, done) {
        if (err) {
            console.log('connection error');
            done();
            res.sendStatus(500);
        } else {
            console.log('req.body', req.body);
            client.query('INSERT INTO pets (petname, breed, color, checkedin) VALUES ($1, $2, $3, $4)', petArr, function (qErr, resultObj) {
                done();
                if (qErr) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    })
})

module.exports = router;