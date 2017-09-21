var router = require('express').Router();
var path = require('path');

router.get('/', function(req, res) {
    console.log('in base route');
    var indexRoute = (path.resolve('public/views/index.html'));
    res.sendFile(indexRoute);
});

module.exports = router;