import React from 'react';
import {Table, Button} from 'reactstrap';

const PetTable = (props) => {

    const url = "http://localhost:3000/pet";

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
        return props.pets.map((pet, index) => {
            return (
                <tr key={index}>
                    <td><strong>{pet.dogname}</strong></td>
                    <td>{pet.breed}</td>
                    <td>{pet.gender}</td>
                    <td>{pet.citylocation}, {pet.statelocation}</td>
                    <td><img src={pet.photourl} width="100px"/></td>
                    <td>{pet.description}</td>
                    <td>
                        <Button onClick={() => {props.editPet(pet); props.updateOn()}} style={updateButton}>Update</Button>
                        <Button onClick={() => {deletePet(pet)}} style={deleteButton}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    const deletePet = (pet) => {
        fetch(url+`/${pet.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then((() => props.fetchPets()))
    };

    return (
        <div style={divStyle}>
            <div style={headerDiv}><center><h3><b>the bachelor(ette) p<img src="https://i.imgur.com/W6LcM4Z.png" style={pawprint}/>d</b></h3></center></div>
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

export default PetTable;