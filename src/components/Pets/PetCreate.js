import React, { useState, useEffect } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const PetCreate = (props) => {
    const [dogname, setDogName] = useState('Name');
    const [breed, setBreed] = useState('Breed');
    const [gender, setGender] = useState('Gender');
    const [citylocation, setCityLocation] = useState('City');
    const [statelocation, setStateLocation] = useState('State');
    const [description, setDescription] = useState('Decription');
    const [photourl, setPhotoUrl] = useState('Photo (URL)');

    const clearDog = () => {
        setDogName('')
    }

    const clearBreed = () => {
        setBreed('')
    }
    
    const clearCity = () => {
        setCityLocation('')
    }

    const clearState = () => {
        setStateLocation('')
    }

    const clearDescription = () => {
        setDescription('')
    }

    const clearPhoto = () => {
        setPhotoUrl('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = JSON.stringify({pet: {dogname: dogname, breed: breed, gender: gender, citylocation: citylocation, statelocation: statelocation, description: description, photourl: photourl}});
        fetch('http://localhost:3000/pet/', {
            method: 'POST',
            body: JSON.stringify({dogname: dogname, breed: breed, gender: gender, citylocation: citylocation, statelocation: statelocation, description: description, photourl: photourl}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then ((res) => res.json())
        .then((petData) => {
            console.log(petData);
            setDogName('');
            setBreed('');
            setGender('');
            setCityLocation('');
            setStateLocation('');
            setDescription('');
            setPhotoUrl('');
            props.fetchPets();
        })
    }

    return ( 
        <>
            <h3>Submit your Pooch!</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="dogname"/>Name
                    <Input name="Name" value={dogname} onChange={(e) => setDogName(e.target.value)} onClick={clearDog}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="breed"/>
                    <Input name="breed" value={breed} onChange={(e) => setBreed(e.target.value)} onClick={clearBreed}/>
                    </FormGroup>
                    <FormGroup>
                    <Input type="select" name="Gender" value={gender} onChange={(e) => setGender (e.target.value)}>
                    <option></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </Input>
                    </FormGroup>
                <FormGroup>
                    <Label htmlFor="citylocation"/>
                    <Input name="City" value={citylocation} onChange={(e) => setCityLocation(e.target.value)} onClick={clearCity}/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="statelocation"/>
                    <Input name="State" value={statelocation} onChange={(e) => setStateLocation(e.target.value)} onClick={clearState}/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="description"/>
                    <Input name="Description" value={description} onChange={(e) => setDescription(e.target.value)} onClick={clearDescription}/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="photourl"/>
                    <Input name="Photo of Pet (URL)" value={photourl} onChange={(e) => setPhotoUrl(e.target.value)} onClick={clearPhoto}/>
                </FormGroup>
                <Button type="submit">Click to Submit</Button>
            </Form>
        </>
     );
}
 
export default PetCreate;