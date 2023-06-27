function auth(params = null) {

  function isAdmin(req, res, next){
    if(req.session.user){ 
      if(req.session.user.userType == "A"){

        return next();
      }else{
        return res.status(401).json({ status:0,message: '접근권한이 없습니다. 회원분류가 정의 되지 않음.',code:'A0002'});
      }

    }else{
      return res.status(401).json({ status:0,message: '접근권한이 없습니다. 로그인 후 다시 시도하세요.',code:'A0001' });
    }
  }
  function isLogin(req, res, next){
    if(req.session.user){ 
      if(req.session.user.userType == "U"){

        return next();
      }else{
        return res.status(401).json({ status:0,message: '접근권한이 없습니다. 회원분류가 정의 되지 않음.',code:'U0002'});
      }

    }else{
      return res.status(401).json({ status:0,message: '접근권한이 없습니다. 로그인 후 다시 시도하세요.',code:'U0001' });
    }
  } 
  return {
    isAdmin,
    isLogin 
  };
}
module.exports = auth;
