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

const StartTrip = () => {

    const [date, setDate] = useState('');
    const [startMileage, setStartMileage] = useState('');
    const [userName, setUserName] = useState(getCookieByName(document.cookie, "NAME"));

    return(
        <div>
          {(userName === "") ?
            <div>Please Log In</div> :
            <h2>Hello, {userName}</h2>
          }
        </div>
    );
}

export default StartTrip;