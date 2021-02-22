import React, { useState, useEffect } from 'react';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';

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
        console.log(pet.updatedAt);
        let updatedAt = new Date(pet.updatedAt).toLocaleDateString();
    return (
        <CarouselItem onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)} key={pet.id}>
            
            <center><img src={pet.photourl} style={{height: 400 + 'px', width: 'auto', padding: 30 + 'px'}}/></center>
            <div className="pet-carousel">
            <div className="pet-header">{pet.dogname} | {pet.breed} | {pet.gender}</div><br/>
                <div className="citystate">{pet.citylocation}, {pet.statelocation}</div><br></br>
                ❝{pet.description}❞<br></br><br></br>
                
                <br></br>
                <div className="emailheart"><img src="https://i.imgur.com/6OeNu0a.png"/></div><div className="bottom-text">Last Updated: {updatedAt}</div>
            </div>   
        </CarouselItem>
    );
})};

    return ( 
        
        <Carousel interval={null} activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators items={allPets} activeIndex={activeIndex} onClickHandler={goToIndex}/>
            {slides()}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
        
     ); 
}
 
export default PetSwipe;

