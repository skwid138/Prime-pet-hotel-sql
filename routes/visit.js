var router = require('express').Router();
var bodyParser = require('body-parser');
var pool = require('./pool');

router.get('/', function (req, res) {
    console.log('in get visit');
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        }//END if err
        else {
            client.query('SELECT * FROM visit LEFT JOIN pets ON pets.id = visit.pet_id;', function (quErr, resObj) {
                done();
                if (quErr) {
                    console.log('query error');
                    res.sendStatus(500);
                }//END if quErr
                else {
                    res.send(resObj.rows);
                }//END else
            });//END client.query
        }//END else no err
    });//END pool connect
});//END get

module.exports = router;