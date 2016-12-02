var express = require('express');
var app = express();
var upload = require('./controls/upload.js')('hinhsanpham');
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

app.post('/xulythem', function(req, res){
  upload(req, res, err => {
    var {title, desc, idPhim} = req.body;
    var image = req.file.filename;
    mangSanPham.push(new SanPham(title, desc, idPhim, image));
    res.redirect('/');
  });
});

app.post('/xulyupdate', parser, function(req, res){
  var {id, title, desc, idPhim, image} = req.body;
  var sp = mangSanPham[id];
  sp.title = title;
  sp.desc = desc;
  sp.idPhim = idPhim;
  sp.hinh = image;
  console.log(sp);
  res.redirect('/list');
});

app.get('/xoa/:id', (req, res) => {
  var {id} = req.params;
  mangSanPham.splice(id, 1);
  res.redirect('/list');
});

app.get('/sua/:id', (req, res) => {
  var {id} = req.params;
  res.render('update', {id, sanPham: mangSanPham[id]});
});

app.get('/test', (req, res) => res.render('test'));
app.post('/xulyhinh', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.send('Loi ' + err);
    }else {
      res.send('Thanh cong: ' + req.file.filename);
    }
  });
});
