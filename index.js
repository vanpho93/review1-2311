var express = require('express');
var app = express();
var upload = require('./controls/upload.js')('hinhsanpham');
var del = require('./controls/del.js');
var {query, getInfo, remove, update} = require('./db.js');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
var SanPham = require('./model/SanPham.js');
var mangSanPham = [
  new SanPham('Android', 'Khoa hoc Android', '192417650','1.png'),
  new SanPham('iOS', 'Khoa hoc iOS', '193884721','2.jpg'),
  new SanPham('ReactJS', 'Khoa hoc ReactJS', '79437743','3.png')
];
app.listen(3000, function(){
  console.log('Server started');
});

app.get('/', (req, res) => {
  query('SELECT * FROM "SanPham"', function(err, result){
    if(err){
      return res.send('Loi ' + err);
    }
    var mang = [];
    result.rows.forEach( e => {
      var {tensp, mota, hinh, phim} = e;
      mang.push(new SanPham(tensp, mota, phim, hinh));
    });
    res.render('index_dark', {mangSanPham: mang});
  });
});

app.get('/admin', (req, res) => res.render('add'));

app.get('/list', (req, res) =>{
  query('SELECT * FROM "SanPham"', function(err, result){
    if(err){
      return res.send('Loi ' + err);
    }
    var mang = [];
    result.rows.forEach( e => {
      var {tensp, mota, hinh, phim, id} = e;
      mang.push(new SanPham(tensp, mota, phim, hinh, id));
    });
    res.render('list', {mangSanPham: mang});
  });
});

var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});

app.post('/xulythem', function(req, res){
  upload(req, res, err => {
    var {title, desc, idPhim} = req.body;
    var image = req.file.filename;

    query(`INSERT INTO "SanPham"(tensp, mota, hinh, phim)
    VALUES ('${title}', '${desc}', '${image}', '${idPhim}')`, (err, result) => {
      if(err){
        res.send('Loi');
      }else{
        res.redirect('/');
      }
    });
  });
});

app.post('/xulyupdate', function(req, res){
  upload(req, res, err => {
    var {id, title, desc, idPhim} = req.body;
    var image = req.file.filename;
    update(title, desc, image, idPhim, id, () => {
      res.redirect('/list');
    })
  })
});

app.get('/xoa/:id', (req, res) => {
  var {id} = req.params;
  remove(id, () => {
    res.redirect('/list');
  });
});

app.get('/sua/:id', (req, res) => {
  var {id} = req.params;
  getInfo(id, (err, result) => {
    if(err) return res.send('Loi');
    var {tensp, mota, hinh, phim, id} = result.rows[0];
    var sanPham = new SanPham(tensp, mota, phim, hinh, id);
    res.render('update', {id, sanPham});
  });
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
