import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import LikedPets from './LikedPets';


const LikedPetsIndex = (props) => {
   
    const [likedpets, setLikedPets] = useState([]);
    const [userData, setUserData] = useState({});

    const divStyle={
        padding: "30px",
        display: "flex",
        justifyContent: "center"
    }

    
    const fetchPets = () => {

        fetch(`http://localhost:3000/user/current`, {
                method: "GET",
                headers: new Headers ({
                    'Content-Type': 'application-json',
                    'Authorization': props.token
                })
            })
            .then((response) => response.json())
            .then((user) => {
                setUserData(user)
                console.log(userData)
                }
            )
            
    };


    useEffect(() => {
        fetchPets();
    }, []);


    return (
        <div style={divStyle}>
            <Container>
            <Col xs="auto">
                    </Col>
                    <br/>
                    <Col lg>
                        <LikedPets user={userData} token={props.token} />
                    </Col>
            </Container>
        </div>
    );
};

export default LikedPetsIndex;