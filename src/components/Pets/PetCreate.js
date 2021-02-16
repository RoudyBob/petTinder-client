import React, { useState, useEffect } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const PetCreate = (props) => {
    const [dogname, setDogName] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [citylocation, setCityLocation] = useState('');
    const [statelocation, setStateLocation] = useState('');
    const [description, setDescription] = useState('');
    const [photourl, setPhotoUrl] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/pet/', {
            method: 'POST',
            body: JSON.stringify({pet: {dogname: dogname, breed: breed, gender: gender, citylocation: citylocation, statelocation: statelocation, description: description, photourl: photourl}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then ((res) => res.json())
        .then((petData) => {
            console.log(petData);
            setDescription('');
            setDefinition('');
            setResult('')
            props.fetchPets();
        })
    }

    return ( 
        <>
            <h3>Submit your Pooch!</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="dogname"/>
                    <Input name="Name" value={dogname} onChange={(e) => setDogName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="breed"/>
                    <Input name="breed" value={breed} onChange={(e) => setBreed(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                    <Input type="select" name="Gender" value={gender} onChange={(e) => setGender (e.target.value)}>
                    <option></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Distance">Distance</option>
                    </Input>
                    </FormGroup>
                <FormGroup>
                    <Label htmlFor="citylocation"/>
                    <Input name="City" value={citylocation} onChange={(e) => setCityLocation(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="statelocation"/>
                    <Input name="State" value={statelocation} onChange={(e) => setStateLocation(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="description"/>
                    <Input name="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="photourl"/>
                    <Input name="Photo of Pet (URL)" value={photourl} onChange={(e) => setPhotoUrl(e.target.value)}/>
                </FormGroup>
                <Button type="submit">Click to Submit</Button>
            </Form>
        </>
     );
}
 
export default PetCreate;