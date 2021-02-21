import React, { useState, useEffect } from 'react';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Input, Form, Button} from 'reactstrap';

const PetSwipe = (props) => {
    const [allPets, setAllPets] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [searchGender, setSearchGender] = useState('Both');
    const [searchCity, setSearchCity] = useState('');

    useEffect(() => {
        fetchPets(searchGender,searchCity,'');
    },[]);

  const next = () => {
    const nextIndex = activeIndex === allPets.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    const nextIndex = activeIndex === 0 ? allPets.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
  } 

    const fetchPets = (gender, city, state) => {
        let url = '';

        if (gender === 'Male') {
            (city) ? url = `http://localhost:3000/pet/city/${city}/${gender}` : url = `http://localhost:3000/pet/gender/${gender}`
        } else if (gender === 'Female') {
            (city) ? url = `http://localhost:3000/pet/city/${city}/${gender}` : url = `http://localhost:3000/pet/gender/${gender}`
        } else {
            (city) ? url = `http://localhost:3000/pet/city/${city}/` : url = `http://localhost:3000/pet/`
        } 

        console.log(`fetch url: ${url}`);
        fetch(url, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then((res) => res.json())
        .then((petAll) => { setAllPets(petAll) })
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

    const genderSelection = (e) => {
        let gender = e.target.value;
        console.log(`Looking for all ${gender} dogs.`);
        setSearchGender(gender);
        fetchPets(gender, searchCity,'');
    }

    const citySelection = (e) => {
        e.preventDefault();
        console.log(`Looking for ${searchGender} dogs in ${searchCity}.`);
        setSearchCity(searchCity);
        fetchPets(searchGender, searchCity,'');
    }

    const clearFilters = (e) => {
        let gender = 'Both';
        let city = null;
        setSearchGender('Both');
        setSearchCity('');
        fetchPets(gender, '','');

    }

    return ( 
        
        <div>
            <Carousel interval={false} activeIndex={activeIndex} next={next} previous={previous}>
                <CarouselIndicators items={allPets} activeIndex={activeIndex} onClickHandler={goToIndex}/>
                {slides()}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>

            <div className="searchContainer">
                <div className="genderFilter">
                    <h5>Filter by Gender</h5>
                    <input type="radio" name="gender" value="Male" checked={searchGender === "Male"} onChange = {genderSelection}></input>
                    <label htmlFor="male">Male</label><br />
                    <input type="radio" name="gender" value="Female" checked={searchGender === "Female"} onChange = {genderSelection}></input>
                    <label htmlFor="female">Female</label><br />
                    <input type="radio" name="gender" value="Both" checked={searchGender === "Both"} onChange = {genderSelection}></input>
                    <label htmlFor="both">Both</label>
                </div>

                <div className="cityFilter">
                    <h5>Filter by City</h5>
                    <form onSubmit={citySelection}>
                        <input type="text" name="gender" autocomplete="off" value={searchCity} placeholder="City" onChange={(e) => setSearchCity(e.target.value)}></input>
                        <button type="submit" value="Submit">submit</button>
                    </form>
                </div>
            </div>
            <div className="clearFilter">
                <button type="button" onClick={clearFilters}>Clear Search Filters</button>
            </div>
        </div>
        
     ); 
}
 
export default PetSwipe;