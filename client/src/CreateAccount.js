import React, {useState} from 'react';
import FormEntry from './FormEntry.js'
import UserNameAvailability from './UserNameAvailability.js'
import './App.css';

const validateEmail = (email) => {
    const expression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if(email.length === 0){return false}

    return !expression.test(String(email).toLowerCase())
}

function noErrors(obj){
    const boolValues = Object.values(obj);
    for(let i = 0; i < boolValues.length; i++){
        if(boolValues[i] === true) {
            return false;}
    }

    return true;
}

function noEmptyFields(...args){

    for(let i = 0; i < args.length; i++){
        if(args[i].length === 0) { return false }
    }

    return true;
}

function checkForInvalidInput(str){

    const expression = /^[a-zA-Z0-9]+$/

    if(str.length === 0){return false}

    return !expression.test(String(str).toLowerCase())
  }

function validate(firstname, lastname, username, email, password1, password2, code){
    return{
        FirstName: checkForInvalidInput(firstname),
        LastName: checkForInvalidInput(lastname),
        UserName: checkForInvalidInput(username),
        Email: validateEmail(email),
        PassWord1: checkForInvalidInput(password1),
        PassWord2: checkForInvalidInput(password2),
        PassWordMatch: password1 !== password2,
        Code: checkForInvalidInput(code),
    }
}

async function enterNewUser(un, fn, ln, em, pw, rc){
    const data = {
        username: un,
        firstname: fn,
        lastname: ln,
        email: em,
        password: pw,
        role: rc,
    }

    const newRequest = await fetch('/CreateNewUser', {method:"POST", body: JSON.stringify(data), 
                                    headers: {"content-type": "application/json"}});

    const results = await newRequest.json();
    console.log(results);
    if(results.message === "Created"){
        alert("account created for: " + un);
    }
    else{
        alert(un + " Already exists or " + rc + " is invalid");
    }
}

const CreateAccount = () => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassWord1] = useState("");
    const [password2, setPassWord2] = useState("");
    const [code, setCode] = useState("");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${username}`);
        enterNewUser(username, firstname, lastname, email, password1, code);
    }

    let errors = validate(firstname, lastname, username, email, password1, password2, code);

    return(
        <div className="App">
            <header className="App-header">
            <h3>Thank you for signing up {username}!</h3>
                <img src="LcDelivery.png" className="App-logo" alt="logo" />
            </header>

            <form onSubmit={handleSubmit}>
                <FormEntry title="First Name" error={errors.FirstName} type="text" value={firstname}
                function={e => setFirstName(e.target.value)}/>

                <FormEntry title="Last Name" error={errors.LastName} type="text" value={lastname}
                function={e => setLastName(e.target.value)}/>

                <FormEntry title="Username" error={errors.UserName} type="text" value={username}
                function={e => setUserName(e.target.value)}/>
                <UserNameAvailability uname={username} />

                <FormEntry title="Email" error={errors.Email} type="text" value={email}
                function={e => setEmail(e.target.value)}/>

                <FormEntry title="Password" error={errors.PassWord1} type="password" value={password1}
                function={e => setPassWord1(e.target.value)}/>

                <FormEntry title="Repeat Password" error={errors.PassWord2} type="password" value={password2}
                function={e => setPassWord2(e.target.value)}/>
                <div>{errors.PassWordMatch ?
                    <div className="errorMessage">*passwords must match</div> :
                    <div></div>}
                </div>

                <FormEntry title="Invitation Code" error={errors.Code} type="text" value={code}
                function={e => setCode(e.target.value)}/>
                <div>
                    {noErrors(errors) && noEmptyFields(firstname, lastname, username, email, password1, password2, code) ?
                    <input type="submit" value="Submit" /> :
                    <div></div>
                    }
                </div>
            </form>
        </div>
    );
}

export default CreateAccount;