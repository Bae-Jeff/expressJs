var express = require('express');
var router = express.Router(); 
/* GET main page. */
router.get('/', function(req, res, next) { 

  mysql.table('item')
  // .where('id = 100')
  .order('itm_no DESC')
  .page(3, 5)
  .countSelect()
  .then(function (data) {
      console.log(data);
      res.json(data);
  }).catch(function (e) {
      console.log(e);
  }); 
 
   
});

module.exports = router;
