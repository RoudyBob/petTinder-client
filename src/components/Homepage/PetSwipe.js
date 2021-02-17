import React, { useState } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

        // dogname: req.body.dogname,
        // breed: req.body.breed,
        // gender: req.body.gender,
        // citylocation: req.body.citylocation,
        // statelocation: req.body.statelocation,
        // description: req.body.description,
        // photourl: req.body.photourl,
        // ownerid: req.user.id

const PetSwipe = (props) => {
    const [allPets, setAllPets] = useState({});
    const [dogname, setDogname] = useState('');
    console.log(props.token);

    const handleSubmit = (e) => {
        fetch('http://localhost:3000/pet', {
            method: 'GET',
            body: JSON.stringify({dogname: dogname}),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
        })
    })
    .then((res) => res.json())
    .then((petAll) => {
        console.log(petAll)
        setAllPets(petAll);
    })
}

    return ( 
        <div>
            Here I am
            <Form onSubmit={handleSubmit}>
            <Button type="submit">Click to Submit</Button>
            </Form>
        </div>
     ); 
}
 
export default PetSwipe;