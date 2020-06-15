var Pool = require('pg').Pool
var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Colby5892::PG',
    port: 5432,
})

router.post('/', function(req, res, next) {
    const { username } = req.body;

    pool.query('SELECT * FROM milagetrackerusers WHERE username = $1', [req.body.username.uname], function(error, data){
        if(data.rows && data.rows.length > 0){
            res.status(201).send({ message: "Exists" })
        }
        else{
            res.status(201).send({ message: "Available" })
        }
    })
});

module.exports = router;
