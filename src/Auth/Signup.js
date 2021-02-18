import React, { useState } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [firstname, setFirstName] = useState('');
const [lastname, setLastName] = useState('');
const [emailErr, setEmailErr] = useState(false);
const [passwordErr, setPasswordErr] = useState(false);

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
    setEmailErr(false);
    setPasswordErr(false);
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username)
    if (emailRegex && password.length >= 5) {
        console.log('Creating User')
        fetch("http://localhost:3000/user/signup", {
            method: 'POST',
            body: JSON.stringify({username: username, password: password, firstname: firstname, lastname: lastname}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
    } else {
        if (!emailRegex) {
            setEmailErr(true);
        }
        if (password.length < 5) {
            setPasswordErr(true)
        }
    }
}

    return ( 
        <div>
            <center><h1 style={heading}>find your pet's
                <br />
                <span style={spanStyle}>pawfect</span> match
            </h1></center>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input type="email" onChange={(e) => setUsername(e.target.value)} name="username" value={username} placeholder="email" style={inputBorder}/>
                    {emailErr ? <p>Please enter a valid email address.</p> : <></>}
                </FormGroup>
                <FormGroup>
                    <Input type="password" onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="password" style={inputBorder}/>
                    {passwordErr ? <p>Password must be 5 characters or greater.</p> : <></>}
                </FormGroup>
                <FormGroup>
                    <Input onChange={(e) => setFirstName(e.target.value)} name="firstname" value={firstname} placeholder="first name" style={inputBorder}/>
                </FormGroup>
                <FormGroup>
                    <Input onChange={(e) => setLastName(e.target.value)} name="lastname" value={lastname} placeholder="last name" style={inputBorder}/>
                </FormGroup>
                <center><Button type="submit" style={buttonColor}>Sign Up</Button></center>
            </Form>
        </div>
     );
}
 
export default Signup;