var Pool = require('pg').Pool
var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

router.post('/', function(req, res, next) {
    const { username } = req.body;

    pool.query('SELECT * FROM mileageentries WHERE username = $1 AND tripend = $2', [username, ''], function(error, data){
        if (error) {
            throw error;
            console.log(error);
        }
        console.log(data.rows)
        res.status(200).json(data.rows)
        })
});

module.exports = router;
