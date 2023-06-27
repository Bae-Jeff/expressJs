var express = require('express');
var auth = require('../helpers/auth');
var router = express.Router(); 

/* GET users listing. */
router.get('/', auth().isAdmin,function(req, res, next) { // mypage main
    res.echo({})
}); 
router.get('/view/:itemNo', function(req, res, next) {
    res.error({
        msg: '나이스 합니다에 ~',
        data:  [{},[]]
    });
});  
module.exports = router;
