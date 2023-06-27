var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/group', function(req, res, next) { 
  db.table('group')
  .field('groupCode,groupName,groupIcon,groupImage')
  .where('groupPart = "bbs"')
  .where('groupFor = "section"')
  .where('groupStatus = "Y"')
  .order('groupOrder ASC')
  // .page(3, 5)
  // .countSelect()
  .select()
  .then(function (rs) { 
      if(rs.length > 0){
        rs.forEach(function(row,key){
          rs[key]['articles'] = []
        });
      } 
      res.echo({data:rs});
  }).catch(function (e) {
      console.log(e);
  }); 
});   
router.get('/list/:groupCode', function(req, res, next) {  
  db.table('article')
  .field('*, DATE_FORMAT(createDate, "%Y-%m-%d %H:%i:%s") as createDate')
  .where('groupCode = "'+req.params.groupCode+'"')
  .order('createDate DESC')
  .page(1, 10)
  .countSelect()
  .then(function(rs){
    // console.log(rs)
    res.echo({data:rs});
  }).catch(function(e){
    console.log(e)
  })
});   
router.get('/list', function(req, res, next) { // article group
  if(!req.params.groupCode){
    res.error({
      code : "B001",
      msg : "전송됭 변수값이 이상합니다."
    })
  }
});
router.get('/comment/:articleNo/:commentPage', function(req, res, next) {
  console.log(req.params)
  db.table('articleComment') 
    .field('*, DATE_FORMAT(createDate, "%Y-%m-%d %H:%i:%s") as createDate')
    .where('articleNo = '+req.params.articleNo) 
    .page(req.params.commentPage, 2)
    .countSelect()
    .then(function(crs){
      // console.log(crs)
      crs.data.forEach(function(row,key){
        crs.data[key]['userImage'] = null
      }) 
      res.echo({data:crs});
    });
});
router.get('/view/:articleNo', function(req, res, next) {
  
  db.table('article')
  .field('*, DATE_FORMAT(createDate, "%Y-%m-%d %H:%i:%s") as createDate')
  .where('articleNo = '+req.params.articleNo) 
  .select()
  .then(function(rs){
    // console.log(rs)
    if(rs[0]){
      db.table('articleComment') 
      .field('*, DATE_FORMAT(createDate, "%Y-%m-%d %H:%i:%s") as createDate')
      .where('articleNo = '+rs[0].articleNo)
      .page(1, 2)
      .countSelect()
      .then(function(crs){
        // console.log(crs)
        crs.data.forEach(function(row,key){
          crs.data[key]['userImage'] = null
        })
        rs[0]['comments'] = crs;
        res.echo({data:rs[0]});
      })
    }else{
      rs[0]['comments']['data'] = [];
      res.echo({data:rs[0]});
    }
    
  }).catch(function(e){
    console.log(e)
  })
});   
router.get('/view', function(req, res, next) {
  res.error({
    code : "B002",
    msg : "전송된 변수값이 이상합니다."
  })
});    
router.get('/', function(req, res, next) { // article group
  res.send('afdsaf with a resource');
});
module.exports = router;
