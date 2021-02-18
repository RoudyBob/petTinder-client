import React, { useState } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Login = (props) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const heading = {
    fontSize: "26px",
    fontWeight: "bold",
    color: "hotpink",
    paddingTop: "50px",
    paddingBottom: "30px"
}

const spanStyle= {
    color: "coral"
}

const inputBorder = {
    border: "1px",
    borderStyle: "solid",
    borderColor: "lightpink"
}

const buttonColor = {
    backgroundColor: "coral",
    border: "none"
}

const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(
        (response) => response.json()
    ).then((data) => {
        console.log(data);
        props.updateToken(data.sessionToken)
    })
}

    return ( 
        <div>
            <center><h1 style={heading}>find your pet's
            <br /><span style={spanStyle}>pawfect</span> match</h1></center>
            <br />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input type="email" onChange={(e) => setUsername(e.target.value)} name="email" value={username} placeholder="email" style={inputBorder}/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="password" style={inputBorder}/>
                </FormGroup>
                <br/>
                <br />
                <center><Button type="submit" style={buttonColor}>Login</Button></center>
            </Form>
        </div>
     );
}
 
export default Login;