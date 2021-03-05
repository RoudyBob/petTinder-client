import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';
import APIURL from '../../helpers/environment';

const LikedPets = (props) => {

    const [petsArray, setPetsArray] = useState('');

    const tableStyle={
        backgroundColor: "white",
        color: "hotpink",
        fontFamily: "arial"
    }

    const tableHead={
        backgroundColor: "coral",
        color: "white"
    }

    const updateButton={
        backgroundColor: "hotpink",
        border: "none"

    }

    const deleteButton={
        backgroundColor: "coral",
        border: "none"
    }

    const divStyle={
        padding: "30px"
    }

    const headerDiv={
        backgroundColor: "hotpink",
        fontSize: "25px",
        color: "white",
        height: "50px",
        padding: "10px",
        fontFamily: "Arial",
        letterSpacing: "-1px"
    }

    const labelColor={
        color: "coral"
    }

    const pawprint = {
        marginBottom: "12px"
    }

    const petMapper = () => {
        if (Array.isArray(petsArray)) {
        return petsArray.map((pet, index) => {
                return (
                    <tr key={index}>
                        <td><strong>{pet.dogname}</strong></td>
                        <td>{pet.breed}</td>
                        <td>{pet.gender}</td>
                        <td>{pet.citylocation}, {pet.statelocation}</td>
                        <td><img src={pet.photourl} width="100px"/></td>
                        <td>{pet.description}</td>
                        <td>
                            <Button onClick={() => {unlikePet(pet)}} style={deleteButton}>Unlike</Button>
                        </td>
                    </tr>
                )
            }
        )
        }
    }

    const unlikePet = (pet) => {
        fetch(`${APIURL}/user/unlike/${pet.id}`, {
            method: 'PUT',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then((() => {
                setPetsArray([]);
                props.fetchPets()
            }))
    };

    useEffect(() => {
        console.log(props.pets.id);
        if (props.pets.id != undefined) {
            setPetsArray([...petsArray, props.pets]);
        }
    },[props.pets])

    return (
        <div style={divStyle}>
            <div style={headerDiv}><center><h3><b>your f <img src="https://i.imgur.com/W6LcM4Z.png" style={pawprint} /> vorite pets</b></h3></center></div>
            <Table striped style={tableStyle}>
                <thead style={tableHead}>
                    <tr style={tableStyle}>
                        <th style={labelColor}>Name</th>
                        <th style={labelColor}>Breed</th>
                        <th style={labelColor}>Gender</th>
                        <th style={labelColor}>Location</th>
                        <th style={labelColor}>Photo</th>
                        <th style={labelColor}>Description</th>
                        <th style={labelColor}></th>
                    </tr>
                </thead>
                <tbody>
                    {petMapper()}
                </tbody>
            </Table>
        </div>
    );
};

export default LikedPets;