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
    });//END pool connect
});//END get

router.post('/', function(req, res) {
    console.log('in pet post', req.body);
    var petname = req.body.petname;
    var breed = req.body.breed;
    var color = req.body.color;
    var petArr = [petname, breed, color];
    pool.connect( function(err, client, done) {
        if (err) {
            console.log('connection error');
            done();
            res.sendStatus(500);
        } else {
            console.log('req.body', req.body);
            client.query('INSERT INTO pets (petname, breed, color) VALUES ($1, $2, $3)', petArr, function (qErr, resultObj) {
                done();
                if (qErr) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

// PUT update db row with new information and respond with accepted
router.put('/:id', function (req, res) {
    console.log('in PUT task route');
    var petId = req.params.id;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('PUT connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            // copied from another project
            var queryString = "UPDATE pets SET checkedin='true' WHERE id=$1";
            var values = [petId];
            client.query(queryString, values, function (queryErr, resObj) {
                if (queryErr) {
                    console.log('Query PUT Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end connect
}); // end PUT

// Delete remove row from db and respond with accepted
router.delete('/:id', function (req, res) {
    console.log('in DELETE task route');
    var petId = req.params.id;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('DELETE connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            var queryString = 'DELETE FROM pets WHERE id=$1';
            var values = [petId];
            client.query(queryString, values, function (queryErr, resObj) {
                if (queryErr) {
                    console.log('Query DELETE Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                } // end else
            }); // end query
        } // end else
    }); // end connect
}); // end DELETE


module.exports = router;