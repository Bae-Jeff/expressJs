/** md5 암호화 */
global.getMd5 =  function(string = ""){
    const crypto = require('crypto'); 
    return crypto.createHash('md5').update(string).digest('hex');
}
/** uuid 생성 */
global.getUuid = function(){
    const { v4: uuidv4 } = require('uuid'); 
    return uuidv4();
} 

 