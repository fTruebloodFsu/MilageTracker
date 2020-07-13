var Pool = require('pg').Pool
var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

router.post('/', function(req, res, next) {
    
    const { username, password } = req.body;

    pool.query('SELECT * FROM milagetrackerusers WHERE username = $1', [username], function(error, data){
        if (error) {
            throw error;
            console.log(error);
        }else if(data.rows && data.rows.length > 0){

            if(bcrypt.compareSync(req.body.password, data.rows[0].password)){
                res.cookie('NAME', data.rows[0].username);
                res.cookie('ROLE', data.rows[0].role);
                res.status(201).send({ message: "User Found.", role: data.rows[0].role })
            }else{
                res.status(201).send({ message: "Username or password incorrect." })
            }
        }else{
            res.status(201).send({ message: "Username or password incorrect." })
        }
    })
});

module.exports = router;
