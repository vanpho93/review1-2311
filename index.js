var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
var SanPham = require('./model/SanPham.js');
var mangSanPham = [
  new SanPham('Android', 'Khoa hoc Android', '192417650','1.png'),
  new SanPham('iOS', 'Khoa hoc iOS', '193884721','2.jpg'),
  new SanPham('ReactJS', 'Khoa hoc ReactJS', '79437743','18081777_th.jpg')
];
app.listen(3000, function(){
  console.log('Server started');
});

app.get('/', function(req, res) {
  res.render('index_dark', {mangSanPham: mangSanPham});
});

app.get('/home', function(req, res) {
  res.redirect('/');
})
