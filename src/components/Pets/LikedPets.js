import {useState} from 'react';
import {Table, Button} from 'reactstrap';

const LikedPets = (props) => {
    console.log(props.user);


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
        // console.log(userInfo)
        return props.user.map((pet, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{pet.dogname}</th>
                    <td>{pet.breed}</td>
                    <td>{pet.gender}</td>
                    <td>{pet.citylocation}, {pet.statelocation}</td>
                    <td><img src={pet.photourl} width="100px"/></td>
                    <td>{pet.description}</td>
                </tr>
            )
        })
    }

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