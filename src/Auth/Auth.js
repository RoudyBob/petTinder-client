import React, { useState } from 'react';
import {Container, Col, Button} from 'reactstrap';
import Signup from './Signup';
import Login from './Login';

const Auth = (props) => {
    const [showLogin, setShowLogin] = useState(true);
    const divStyle = {
        width: '350px',
        height: '490px',
        marginTop: '100px',
        backgroundColor: "white",
        border: '2px solid lightgrey',
        borderRadius: '10px',
        fontFamily: 'Arial',
      };

    function handleToggle () {
        setShowLogin(!showLogin)
    }
    
    return ( 
        <Container style={divStyle}>
            {showLogin === true ? <Login updateToken={props.updateToken}/> : <Signup updateToken={props.updateToken}/>}
        <center><br />Not a user?
        <br /><Button color="link" onClick = {handleToggle}>Sign up!</Button></center>
       </Container>
     );
}
 
export default Auth;