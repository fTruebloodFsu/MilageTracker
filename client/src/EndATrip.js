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


  const DisplayExistingTrips = (props) => {

    return(
        <div id={props.id}>
            <Container className='container-results-end-trips'>
                <Row>
                    <Col xs="3">{props.date}</Col>
                    <Col xs="3">{props.vehicle}</Col>
                    <Col xs="3">{props.tripstart}</Col>
                    <Col xs="3"><Button color="primary" size="sm">End Trip</Button></Col>
                </Row>
            </Container>
            <br></br>
        </div>
    );
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
                    <Container>
                        <Row>
                            <Col xs="3">Date</Col>
                            <Col xs="3">Vehicle</Col>
                            <Col xs="3">Begin Mileage</Col>
                            <Col xs="3">End Mileage</Col>
                        </Row>
                    </Container>
                    <div>{existingTrips.map(x => DisplayExistingTrips(x))}</div>
                </div>
              }
            </div>
        }
        </div>
    );
  }

  export default EndATrip;