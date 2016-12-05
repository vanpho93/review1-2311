var pg = require('pg');
var config = {
  user: 'postgres',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  database: 'EmployeeDB',
  max: 100,
  idleTimeoutMillis: 10000
}
var pool = new pg.Pool(config);

function query(sql, cb){
  var loi;
  var ketqua;

  pool.connect((err, client, done) => {
    if(err){
      loi = "Loi ket noi";
      cb(loi, ketqua);
      return console.log('Loi ket noi');

    }
    client.query(sql, (err, result) => {
      if(err){
        loi = "Loi truy van";
        cb(loi, ketqua);
        return console.log('Loi truy van');
      }
      ketqua = result
      cb(loi, ketqua);
    });
    done();
  });
}

function getInfo(id, cb){
  query(`SELECT * FROM "SanPham" WHERE id = ${id}`, cb);
}

function remove(id, cb){
  query(`DELETE FROM "SanPham" WHERE id=${id}`, cb)
}

function update(tensp, mota, hinh, phim, id, cb){
  query(`UPDATE public."SanPham"
	SET tensp='${tensp}', mota='${mota}', phim='${phim}', hinh='${hinh}'
	WHERE id=${id}`, cb);
}

module.exports = {query, getInfo, remove, update};

// query(`SELECT * FROM "SanPham"`,function(a){
//   console.log(a.rows);
// });
