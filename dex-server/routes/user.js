var express = require('express'); 
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { // mypage main
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) { 
  // console.log(req.body);
  mysql.table('user')
  .where('userId = "'+req.body.userId+'"')
  // .order('itm_no DESC')
  // .page(3, 5)
  // .countSelect()
  .select()
  .then(function (data) {
      console.log(data);
      res.echo({data:data});
  }).catch(function (e) {
      console.log(e);
  }); 

  return false;
  req.session.user = {
    isLogin : true,
    token : 'userAcessSampleToken',
    expires : 6000,
    info : {
      userId :  req.body.userId,
      userName: req.body.userId,
      userType :  'A',
      userLevel : 9
    }
  } 
  res.echo({data:req.session.user}) ;
});
router.post('/logout', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/create', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/update', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/quite', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
