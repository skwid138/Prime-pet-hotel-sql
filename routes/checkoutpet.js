var router = require('express').Router();
var bodyParser = require('body-parser');
var pool = require('./pool');

router.put('/:id', function (req, res) {
    console.log('in PUT task route');
    var petId = req.params.id;
    var petStatus = req.body.check_out;
    var newStatus = true;
    // will set check_in value to false if it's already true,
    // otherwise it sets false value to false
    if (petStatus) {
        newStatus = false;
    }
    console.log('petId ', petId);
    console.log('petStatus ', petStatus);
    console.log('newStatus ', newStatus);

    pool.connect(function (err, client, done) {
        if (err) {
            console.log('PUT connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            // copied from another project
            var queryString = "UPDATE visit SET check_out=$2 WHERE pet_id=$1";
            var values = [petId, newStatus];
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

module.exports = router;
