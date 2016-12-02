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

app.get('/', (req, res) => res.render('index_dark', {mangSanPham}))

app.get('/admin', (req, res) => res.render('add'));

app.get('/list', (req, res) => res.render('list', {mangSanPham}));

var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});

app.post('/xulythem', parser, function(req, res){
  var {title, desc, idPhim, image} = req.body;
  console.log(req.body);
  mangSanPham.push(new SanPham(title, desc, idPhim, image));
  res.redirect('/');
});

app.get('/xoa/:id', (req, res) => {
  var {id} = req.params;
  mangSanPham.splice(id, 1);
  res.redirect('/list');
});
