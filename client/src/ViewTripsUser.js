import React, {useState, useEffect} from 'react';
import FormEntry from './FormEntry.js'
import LoginRequired from './LoginRequired.js'
import { Container, Row, Col } from 'reactstrap';
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

function validInputUn(str){

    const expression = /^[a-zA-Z0-9]+$/
    if(str.length === 0){return false}
    return !expression.test(String(str).toLowerCase())
}

function vaildInputDate(s){

    if(s.length === 0){return false}
    return false
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

const validate = (un, bd, ed) => {
    return{
        UserName: validInputUn(un),
        BeginDate: vaildInputDate(bd),
        EndDate: vaildInputDate(ed),
    }
}

function mileReducer(arr){
    return arr.reduce((x,y) => x+y.triptotal,0);
}

const ViewTripsUser = () => {

    const [userName, setUserName] = useState(getCookieByName(document.cookie, "NAME"));
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [trips, setTrips] = useState([]);


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
        
        setTrips(results);
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

    const handleSubmit = (evt) => {
        evt.preventDefault();
        getTripsBetweendates(userName, beginDate, endDate);
    }

    const errors = validate(userName, beginDate, endDate)

    return(
        <div>
          {(userName === "") ?
            <LoginRequired/> :
            <div>
              <h2 className='center'>Hello, {userName}!</h2>
              <p className='center'>Please select the date range you want to view.</p>
              <br></br>
              <form className='center' onSubmit={handleSubmit}>

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
              <br></br>
            <div>{trips.map(x => displayTrips(x))}</div>
            <div>
                {(trips.length !== 0) ?
                    <div className='center'><b>Total mileage: {trips.reduce((x,y) => x+parseInt(y.triptotal),0)}</b></div> :
                    <div></div>
                }
            </div>
            </div>
          }
        </div>
    );
}

export default ViewTripsUser;