import React, {useState} from 'react';
import {  Link } from 'react-router-dom';
import FormEntry from './FormEntry.js'
import './App.css';

function noEmptyFields(...args){

    for(let i = 0; i < args.length; i++){
        if(args[i].length === 0) { return false }
    }

    return true;
}

function noErrors(obj){
    const boolValues = Object.values(obj);
    for(let i = 0; i < boolValues.length; i++){
        if(boolValues[i] === true) {
            return false;}
    }

    return true;
}

function checkForInvalidInput(str){

    const expression = /^[a-zA-Z0-9]+$/

    if(str.length === 0){return false}
    
    return !expression.test(String(str).toLowerCase())
  }

function validate(username, password){
    return{
        UserName: checkForInvalidInput(username),
        PassWord: checkForInvalidInput(password),
    }
}

async function verifyUser(un, pw){
    const data = {
        username: un,
        password: pw,
    }

    const newRequest = await fetch('/verifyUserAndPassword', {method:"POST", body: JSON.stringify(data), 
                                    headers: {"content-type": "application/json"}});

    const results = await newRequest.json();
    console.log(results);
    if(results.message === "User Found."){
        console.log(results.UniqueId);
    }
}

const Home = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        verifyUser(name, password);
    }

    let errors = validate(name, password);


    return(
        <div className="App">
            <header className="App-header">
                <h3>Hello {name}!</h3>
                <img src="LcDelivery.png" className="App-logo" alt="logo" />
            </header>
            <br></br>
            <form onSubmit={handleSubmit}>
                <FormEntry title="Username" error={errors.UserName} type="text" value={name}
                function={e => setName(e.target.value)}/>
                <br></br>
                <FormEntry title="Password" error={errors.PassWord} type="password" value={password}
                function={e => setPassword(e.target.value)}/>

                <br></br>
                <div>
                    {noErrors(errors) && noEmptyFields(name, password)?
                    <input type="submit" value="Submit" /> :
                    <div></div>
                    }
                </div>
                <br></br>
                <div>Log in or, </div>
                <Link to="/CreateAccount">Create Account</Link>
            </form>
        </div>
  );
}

export default Home;