import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import LoginRequired from './LoginRequired.js'
import FormEntry from './FormEntry.js'
import UserNameAvailability from './UserNameAvailability.js'
import './App.css';

const getCookieByName = (cookie, s) => {
    let result = "";
    
    const splitCookie = cookie.split(';');
    
    for(let i = 0; i < splitCookie.length; i++){
      
      if(splitCookie[i].includes(s)){
        const S_found = splitCookie[i].split('=');
        result = result +  S_found[1];
      }
      
    }
    return result;
  }

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

function validInputUn(str){

    const expression = /^[a-zA-Z0-9]+$/
    if(str.length === 0){return false}
    return !expression.test(String(str).toLowerCase())
}

function vaildInputDate(s){

    if(s.length === 0){return false}
    return false
}

const validate = (un, bd, ed) => {
    return{
        TargetUser: validInputUn(un),
        BeginDate: vaildInputDate(bd),
        EndDate: vaildInputDate(ed),
    }
}

const AdminView = () => {

    const [userName, setUserName] = useState(getCookieByName(document.cookie, "NAME"));
    const [role, setRole] = useState(getCookieByName(document.cookie, "ROLE"));
    const [data, setData] = useState([]);
    const [beginDate, setBeginDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [targetUser, setTargetUser] = useState("");

    useEffect(() => {
        getTripsBetweendates(userName, beginDate, endDate);
    }, []);

    async function getTripsBetweendates(un, bd, ed){
        const data = {
            username: un,
            begindate: bd,
            enddate: ed,
        }
    
        const newRequest = await fetch('/GetTripsByDateAndUser', {method:"POST", body: JSON.stringify(data), 
                                        headers: {"content-type": "application/json"}});
    
        const results = await newRequest.json();
        
        setData(results);
        return results;
    }

    const displayTrips = (props) =>{

        return(
        <div className="container-results-end-trips">
            <Container id={props.id}>
                <Row>
                    <Col xs="3"><b>{props.date}</b></Col>
                    <Col xs="3">{props.vehicle}</Col>
                </Row>
                <Row>
                    <Col xs="3">Start: {props.tripstart}</Col>
                    <Col xs="3">End: {props.tripend}</Col>
                </Row>
                <Row>
                    <Col xs="3"><b>Total: {props.triptotal}</b></Col>
                </Row>
            </Container>
        </div>
        );
    }

    const errors = validate(targetUser, beginDate, endDate);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        getTripsBetweendates(targetUser, beginDate, endDate);
    }

    return(
        <div>
            {(userName === "") ?
                <LoginRequired/> :
                (role !== "ADMIN") ?
                    <h2>You must be an admin to view this page.</h2> :
                    <div>
                        <h2 className='center'>Hello, {userName}!</h2>
                        <br></br>
                        <form className='center' onSubmit={handleSubmit}>

                        <FormEntry title="Username" error={errors.TargetUser} type="text" value={targetUser}
                        function={e => setTargetUser(e.target.value)}/>
                        <UserNameAvailability uname={targetUser} />
                        <br></br>

                        <FormEntry title="Begin Date" error={errors.BeginDate} type="date" value={beginDate}
                        function={e => setBeginDate(e.target.value)}/>
                        <br></br>

                        <FormEntry title="End Date" error={errors.EndDate} type="date" value={endDate}
                        function={e => setEndDate(e.target.value)}/>
                        <br></br>

                        <div>
                            {noErrors(errors) && noEmptyFields(userName, beginDate, endDate) ?
                            <input type="submit" value="Submit" /> :
                            <div></div>
                            }
                        </div>
                        </form>

                        <div>
                            {(data.length !== 0) ?
                                <div className='center'><b>Total mileage: {data.reduce((x,y) => x+parseInt(y.triptotal),0)}</b></div> :
                                <div></div>
                            }
                        </div>
                        <div>{data.map(x => displayTrips(x))}</div>
                    </div>
            }
        </div>
    );
}

export default AdminView;