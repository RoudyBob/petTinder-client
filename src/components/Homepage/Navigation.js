import React, { useState } from 'react';
import PetIndex from '../Pets/PetIndex';
import {
    Navbar,
    NavbarBrand,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import {
    Route,
    Link,
    Switch,
    BrowserRouter
} from 'react-router-dom';

const Navigation = (props) => {

    const tinderHeader = {
        fontSize: "32px",
        color: "white",
        fontWeight: "700",
        letterSpacing: ".1px",
        marginLeft: "40px"
    }

    const headerSubtitle = {
        fontSize: "12px",
        color: "white",
        fontWeight: "600",
        marginLeft: "-100px",
        marginTop: "60px"
    }

    const navColor = {
        background: 'linear-gradient(to right, hotpink, coral)',
        height: "65px"
    }

    const buttonColor = {
        backgroundColor: "hotpink",
        border: "none",
        letterSpacing: "-1px"
    }

    const navButton = {
        padding: "10px"
    }


    return ( 
        <Navbar color="faded" light expand="md" style={navColor} fixed="top">
            <NavbarBrand href="/" style={tinderHeader}><img src="https://i.imgur.com/VvsuXLH.png"/>pettinder.</NavbarBrand>
            <br /><p style={headerSubtitle}>where dog breeders meet.</p>
                <Nav className="ml-auto" navbar>
                    <NavItem style={navButton}>
                        {localStorage.getItem('token') ? <Button href="/mypets" style={buttonColor}>my pets</Button> : <></>}
                    </NavItem>
                    <NavItem style={navButton}>
                        {localStorage.getItem('token') ? <Button href="/email" style={buttonColor}>email</Button> : <></>}
                    </NavItem>
                    <NavItem style={navButton}>
                        {localStorage.getItem('token') ? <Button onClick={props.clickLogout} style={buttonColor}>logout</Button> : <></>}
                    </NavItem>
                </Nav>
        </Navbar>
     )
}
 
export default Navigation;