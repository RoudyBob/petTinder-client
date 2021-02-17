import React, { useState, useEffect } from 'react';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Form, Button} from 'reactstrap';


const PetSwipe = (props) => {
    const [allPets, setAllPets] = useState([]);
    const [dogname, setDogname] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [citylocation, setCityLocation] = useState('');
    const [statelocation, setStateLocation] = useState('');
    const [description, setDescription] = useState('');
    const [photourl, setPhotoUrl] = useState('');

    const fetchPets = () => {
        console.log('hi there');
        fetch('http://localhost:3000/pet', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
        })
    }).then((res) => res.json())
    .then((petAll) => {
        setAllPets(petAll)
    })
}

useEffect(() => {
    fetchPets();
}, []);

const slides = () => {
    return allPets.map((pet) => {
    return (
        <CarouselItem key={pet.id}>
            <CarouselCaption captionText={pet.dogname} captionHeader={pet.breed} />
        </CarouselItem>
        
    );
})};

    return ( 
        <div><p>The Carousel is Below</p>
            <Carousel>
                {slides()}
            </Carousel>
        </div>
     ); 
}
 
export default PetSwipe;