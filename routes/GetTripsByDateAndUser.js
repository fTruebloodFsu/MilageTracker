var Pool = require('pg').Pool
var express = require('express');
var router = express.Router();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Colby5892::PG',
    port: 5432,
})

router.post('/', function(req, res, next) {

    const { username, begindate, enddate } = req.body;

    pool.query('SELECT * FROM mileageentries WHERE username = $1 AND date >= $2 AND date <= $3', 
		  [username, begindate, enddate], (error, results) => {
		  if (error) {
              throw error;
              console.log(error);
          }
          
		  res.status(200).json(results.rows)
		  })


}
);

module.exports = router;