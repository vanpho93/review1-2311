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

function getData(cb){
  pool.connect((err, client, done) => {
    if(err){
      return console.log('Loi ket noi');
    }
    client.query('SELECT * FROM "SanPham"', (err, result) => {
      if(err){
        return console.log('Loi truy van');
      }
      cb(result.rows);
    });
    done();
  });
}

getData(function(a){
  console.log(a);
});
