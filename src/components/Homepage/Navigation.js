import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    Button
} from 'reactstrap';

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
        border: "none"
    }

    return ( 
        <Navbar color="faded" light expand="md" style={navColor}>
            <NavbarBrand href="/" style={tinderHeader}>pettinder.</NavbarBrand>
            <br /><p style={headerSubtitle}>where dog breeders meet.</p>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {localStorage.getItem('token') ? <Button onClick={props.clickLogout} style={buttonColor}>Logout</Button> : <></>}
                    </NavItem>
                </Nav>
        </Navbar>
     )
}
 
export default Navigation;