import React from 'react';
import {Table, Button} from 'reactstrap';

const PetTable = (props) => {

    const url = "http://localhost:3000/pet";

    const petMapper = () => {
        return props.pets.map((pet, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{pet.dogname}</th>
                    <td>{pet.breed}</td>
                    <td>{pet.gender}</td>
                    <td>{pet.citylocation}, {pet.statelocation}</td>
                    <td><img src={pet.photourl} width="100px"/></td>
                    <td>{pet.description}</td>
                    <td>
                        <Button onClick={() => {props.editPet(pet); props.updateOn()}} color="warning">Update</Button>
                        <Button onClick={() => {deletePet(pet)}} color="danger">Delete</Button>
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
        <div>
            <h3>My Pets</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Gender</th>
                        <th>Location</th>
                        <th>Photo</th>
                        <th>Description</th>
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