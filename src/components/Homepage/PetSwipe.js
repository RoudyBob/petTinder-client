import React, { useState, useEffect } from 'react';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Form, Button} from 'reactstrap';


const PetSwipe = (props) => {
    const [allPets, setAllPets] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        fetchPets();
    }, []);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === allPets.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? allPets.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  } 

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



const slides = () => {
    return allPets.map((pet) => {
    return (
        <CarouselItem key={pet.id}>
            
            <img src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png" style={{height: 400 + 'px', width: 'auto'}}/>
            
            <CarouselCaption captionText={pet.dogname} captionHeader={pet.breed} />  
            <div className="pet-carousel">
                {pet.gender}<br></br>
                {pet.citylocation}<br></br>
                {pet.statelocation}<br></br>
                {pet.description}
            </div>   
        </CarouselItem>
        
    );
})};


    return ( 
        
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators items={allPets} activeIndex={activeIndex} onClickHandler={goToIndex}/>
            {slides()}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
        
     ); 
}
 
export default PetSwipe;