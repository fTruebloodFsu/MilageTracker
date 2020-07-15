import React, {useState} from 'react';
import FormEntry from './FormEntry.js'
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

function validate(un, date, start, end, car){

  return{
    UserName: validInputUn(un),
    Date: vaildInputDate(date),
    StartMiles: validInputStartMiles(start),
    EndMiles: validInputEndMiles(end),
    Vehicle: validInputUn(car),
  }
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

function validInputStartMiles(s){

  if(s.length === 0){return false}
  const expression = /^\d+$/
  return !expression.test(String(s).toLowerCase())
}

function validInputEndMiles(s){

  if(s.length === 0){return false}
  const expression = /^\d+$/
  return !expression.test(String(s).toLowerCase())
}

async function beginTrip(userName, date, startMileage, endMileage, car){

  let totalMileage = "";
  if(endMileage !== ""){
    totalMileage = (endMileage - startMileage) + "";
  }
  
  const data = {
      username: userName,
      date: date,
      tripstart: startMileage,
      tripend: endMileage,
      vehicle: car,
      triptotal: totalMileage,
  }

  const newRequest = await fetch('/startTrip', {method:"POST", body: JSON.stringify(data), 
                                  headers: {"content-type": "application/json"}});

  const results = await newRequest.json();
  console.log(results);
  if(results.message === "Success"){
    alert("Trip Entered")
  }
}

const StartTrip = () => {

    const [date, setDate] = useState('');
    const [car, setCar] = useState('');
    const [startMileage, setStartMileage] = useState('');
    const [endMileage, setEndMileage] = useState('');
    const [userName, setUserName] = useState(getCookieByName(document.cookie, "NAME"));
    const [role, setRole] = useState(getCookieByName(document.cookie, "ROLE"));

    const handleSubmit = (evt) => {
      evt.preventDefault();
      beginTrip(userName, date, startMileage, endMileage, car)
    }

    let errors = validate(userName, date, startMileage, endMileage, car);

    return(
        <div>
          {(userName === "") ?
            <div>Please Log In</div> :
            <div className='App-header-smaller-text'>
              <h2 >Hello, {userName}!</h2>
              <div>To begin your trip enter the date, vehicle, odometer reading.</div>
              <div>The end reading can be entered now, or at the end of your day.</div>
              <br></br>
              
              <form className='App-header-smaller-text' onSubmit={handleSubmit}>

                <FormEntry title="Date" error={errors.Date} type="date" value={date}
                function={e => setDate(e.target.value)}/>
                <br></br>

                <FormEntry title="Vehicle" error={errors.Vehicle} type="text" value={car}
                function={e => setCar(e.target.value)}/>
                <br></br>

                <FormEntry title="Start Mileage" error={errors.StartMiles} type="text" value={startMileage}
                function={e => setStartMileage(e.target.value)}/>
                <br></br>

                <FormEntry title="End Mileage" error={errors.EndMiles} type="text" value={endMileage}
                function={e => setEndMileage(e.target.value)}/>
                <br></br>
                
                <div>
                  {noErrors(errors) && noEmptyFields(userName, date, startMileage, car) && 
                  ((parseInt(endMileage) > parseInt(startMileage) || endMileage === ""))?
                  <input type="submit" value="Submit" /> :
                  <div></div>
                  }
                </div>
              </form>
            </div>
          }
        </div>
    );
}

export default StartTrip;