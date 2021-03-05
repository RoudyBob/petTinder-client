import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import LikedPets from './LikedPets';
import APIURL from '../../helpers/environment';


const LikedPetsIndex = (props) => {
   
    const [pets, setPets] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    const divStyle={
        padding: "30px",
        display: "flex",
        justifyContent: "center"
    }

    
    const fetchPets = () => {
        fetch(`${APIURL}/user/current`, {
                method: "GET",
                headers: new Headers ({
                    'Content-Type': 'application-json',
                    'Authorization': props.token
                })
            })
            .then((response) => response.json())
            .then((user) => {
                // console.log(user.likedpets);
                if (user.likedpets) {
                    user.likedpets.map((petid, index) => {
                        fetch(`${APIURL}/pet/${petid}`, {
                            method: "GET",
                            headers: new Headers ({
                              'Content-Type': 'application-json',
                              'Authorization': props.token
                            })
                        })
                        .then((response) => response.json())
                        .then((pet) => setPets(pet))
                    })
                }
            })
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
                        <LikedPets pets={pets} fetchPets={fetchPets} token={props.token} />
                    </Col>
            </Container>
        </div>
    );
};

export default LikedPetsIndex;