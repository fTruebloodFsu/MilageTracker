var Pool = require('pg').Pool
var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

router.post('/', function(req, res, next) {
    
    const { username, firstname, lastname, email, password, role } = req.body;
    let hash = bcrypt.hashSync(req.body.password, 10);


    const code = req.body.role
    const adminCode = "ADMIN561";
    const userCode = "user561";
    let inputCode = "";
    let validCode = false;

    console.log(code);
    console.log(adminCode);

    if(code === adminCode){
        console.log("admin")
        inputCode = "ADMIN";
        validCode = true;
    }
    if(code === userCode){
        console.log("user")
        inputCode = "USER";
        validCode = true;
    }

    pool.query('SELECT * FROM milagetrackerusers WHERE username = $1', [username], function(error, data){
        if(data.rows && data.rows.length > 0 || !validCode){
            res.status(201).send({ message: "Exists or invalid code" })
        }
        else{
            pool.query('INSERT INTO milagetrackerusers(username, firstname, lastname, email, password, role) VALUES($1, $2, $3, $4, $5, $6)', 
                [username, firstname, lastname, email, hash, inputCode], 
                (error,result) => {
                    if (error) {
                        throw error
                    }
                    res.status(201).send({ message: "Created" })
                })
        }
    })
});

module.exports = router;
