var Pool = require('pg').Pool
var express = require('express');
var router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

router.post('/', function(req, res, next) {

    const { username, tripstart, tripend, triptotal, vehicle, date } = req.body;

    pool.query('INSERT INTO mileageentries(username, tripstart, tripend, triptotal, vehicle, date) VALUES($1, $2, $3, $4, $5, $6)', 
                [username, tripstart, tripend, triptotal, vehicle, date], 
                (error,result) => {
                    if (error) {
                        throw error
                    }
                    res.status(201).send({ message: "Success" })
                })


}
);

module.exports = router;
