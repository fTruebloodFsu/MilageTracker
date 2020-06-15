import React, {useState, useEffect} from 'react';
import './App.css';

const UserNameAvailability = (uname) => {

    const [availability, setAvailability] = useState(true);

    async function checkUserName(un){
        const data = {
            username: un,
        }
    
        const newRequest = await fetch('/CheckUserNameAvailability', {method:"POST", body: JSON.stringify(data), 
                                        headers: {"content-type": "application/json"}});
    
        const results = await newRequest.json();
        
        if(results.message === "Exists"){
            setAvailability(true);
        }
        if(results.message === "Available"){
            setAvailability(false);
        }
        return results;
    }

    useEffect(() => {
        checkUserName(uname);
    }, [uname]);

    return(
        <div>
            {availability ?
            <div className="errorMessage">*username taken</div> :
            <div></div>}
        </div>
    );
}

export default UserNameAvailability;