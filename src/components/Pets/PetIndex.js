import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import PetCreate from './PetCreate';
import PetTable from './PetTable';
import PetEdit from './PetEdit';

const url = 'http://localhost:3000/pet'

const PetIndex = (props) => {
   
    const [pets, setPets] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [petToUpdate, setPetToUpdate] = useState({});

    const editPet = (pet) => {
        setPetToUpdate(pet);
        console.log(pet);
    };

    const updateOn = () =>  {
        setUpdateActive(true);
    };

    const updateOff = () => {
        setUpdateActive(false);
    }

    const fetchPets = () => {
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then((response) => response.json())
            .then((petData) => { setPets(petData); console.log(petData) })
    }

    useEffect(() => {
        fetchPets();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col md="3">
                        <PetCreate fetchPets={fetchPets} token={props.token} />
                    </Col>
                    <Col md="9">
                        <PetTable pets={pets} editPet={editPet} updateOn={updateOn} fetchPets={fetchPets} token={props.token} />
                    </Col>
                    {updateActive ? <PetEdit petToUpdate={petToUpdate} updateOff={updateOff} token={props.token} fetchPets={fetchPets} /> : <></> }
                </Row>
            </Container>
        </div>
    );
};

export default PetIndex;