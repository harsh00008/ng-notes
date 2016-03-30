var express = require('express');
var router = express.Router();

router.get('/api/test', function(req, res){
    res.sendStatus(200);
    res.write('My test api');
    res.end();
});

module.exports = router;
