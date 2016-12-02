var fs = require('fs');
function del(filename){
  fs.unlink('./public/images/background/'+filename, err => {
    if(err){
      console.log('Loi ' + err);
    }else{
      console.log('Da xoa');
    }
  });
}

module.exports = del;
