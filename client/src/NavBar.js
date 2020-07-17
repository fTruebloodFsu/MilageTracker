import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {  Link } from 'react-router-dom';

function MyNavBar(target){
  
    const navStyle = {
      color: 'black'
    };
  
      return (
        <div className='navStyle'>
          <div>
            Mileage Tracker
          </div>
          <UncontrolledDropdown>
            <DropdownToggle caret>
              Options
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header><Link style={navStyle} to='/'>Home</Link></DropdownItem>
              <DropdownItem header><Link style={navStyle} to='/StartATrip'>Begin Trip</Link></DropdownItem>
              <DropdownItem header><Link style={navStyle} to='/EndATrip'>End Trip</Link></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        
      );
    }
    
    export default MyNavBar;