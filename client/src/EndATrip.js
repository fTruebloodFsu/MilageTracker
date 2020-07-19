import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import LoginRequired from './LoginRequired.js'
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

  const EndATrip = () => {

    const [userName, setUserName] = useState(getCookieByName(document.cookie, "NAME"));
    const [existingTrips, setExistingTrips] = useState([]);

    useEffect(() => {
        getTripsWithNoEnd(userName);
    }, []);

    async function getTripsWithNoEnd(un){
        const data = {
            username: un,
        }
    
        const newRequest = await fetch('/TripsWithNoEnd', {method:"POST", body: JSON.stringify(data), 
                                        headers: {"content-type": "application/json"}});
    
        const results = await newRequest.json();
        
        setExistingTrips(results);
        return results;
    }

    const DisplayExistingTrips = (props) => {

        return(
            <div className="container-results-end-trips">
                <Container id={props.id}>
                    <Row>
                        <Col xs="3"><b>{props.date}</b></Col>
                    </Row>
                    <Row>
                        <Col xs="3">{props.username}</Col>
                        <Col xs="3">{props.vehicle}</Col>
                    </Row>
                    <Row>
                        <Col xs="3">Start mileage: {props.tripstart}</Col>
                        <Col xs="3">
                            <Button color="primary" size="sm" onClick={()=>finishTrip(props.id, props.tripstart)}>End Trip</Button>
                        </Col>
                    </Row>
                </Container>
                <br></br>
            </div>
        );
      }
    
      const finishTrip = (id, start) => {
        const end = prompt("Enter your odometer reading to end this trip: ")
        
        if(start > end){
            alert("Beginning read cannot be greater than the end reading.")
        }else{
            const total = (end - start) + ""
            updateTrip(id, end, total);
        }
      }
    
      async function updateTrip(id, end, total){
        const data = {
            id: id,
            tripend: end,
            triptotal: total,
            username: userName,
        }
    
        const newRequest = await fetch('/UpdateTrip', {method:"POST", body: JSON.stringify(data), 
                                        headers: {"content-type": "application/json"}});
    
        const results = await newRequest.json();
        setExistingTrips(results);
        return results;
        }

    return(
        <div>
        {(userName === "") ?
            <LoginRequired/> :
            <div>
              <h2 className='center'>Hello, {userName}!</h2>
              {(existingTrips.length === 0) ?
                <div className='center'>You have no pending trips.</div>:
                <div>
                    <div className='center'>You have pending trips: </div>
                    <br></br>
                    <div>{existingTrips.map(x => DisplayExistingTrips(x))}</div>
                </div>
              }
            </div>
        }
        </div>
    );
  }

  export default EndATrip;
