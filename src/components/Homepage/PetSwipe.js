import React, { useState, useEffect } from 'react';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Input, Form, Button, ModalBody, Modal} from 'reactstrap';
import PetEmail from '../Pets/PetEmail';

const PetSwipe = (props) => {
    const [allPets, setAllPets] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [searchGender, setSearchGender] = useState('Both');
    const [searchCity, setSearchCity] = useState('');
    const [owner, setOwner] = useState([]);
    const [owners, setOwners] = useState([]);
    const [modal, setModal] = useState(false);
    const [userToken, setUserToken] = useState(props.token);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        fetchPets(searchGender,searchCity,'');
        fetchOwners();
    }, []);

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
    
    const fetchOwners = () => {
    let url = 'http://localhost:3000/user/owners';
    console.log(url);
    fetch(url, {
           method: 'GET',
           headers: new Headers ({
           'Content-Type': 'application/json',
        })
     }).then((res) => res.json())
     .then((petOwners) => {
        setOwners(petOwners)
        console.log(petOwners)
        })
        }

    const slides = () => {
        return allPets.map((pet) => {
            console.log(pet.updatedAt);
            let updatedAt = new Date(pet.updatedAt).toLocaleDateString();
            let ownerid = (pet.ownerid);
            let obj = owners.find(obj => obj.id == ownerid);
    
            return (
                <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={pet.id}>
                    <div>
                        <center><img src={pet.photourl} style={{height: 400 + 'px', width: 'auto', padding: 30 + 'px'}}/></center>
                        <div className="pet-carousel">
                            <div className="pet-header">{pet.dogname} | {pet.breed} | {pet.gender}</div><br/>
                            <div className="citystate">{pet.citylocation}, {pet.statelocation}</div>
                            <div>
                                <br></br>❝{pet.description}❞<br></br><br></br>
                            </div>
                            <div id="pet-email" style={{display: "none"}}>{pet.ownerid}</div>
                            
                        <div className="bottom-text">Last Updated: {updatedAt}</div>
                        
                        </div> 
                            <div className="emailheart"><Button onClick={toggle}><img src="https://i.imgur.com/6OeNu0a.png"/></Button></div>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalBody>
                                    <PetEmail token={userToken}/>
                                </ModalBody>
                            </Modal>
                    </div> 
                </CarouselItem>
                
            );
        })
    };

    return ( 
        
        <div>
            <Carousel interval={false} activeIndex={activeIndex} next={next} previous={previous}>
                {/* <CarouselIndicators items={allPets} activeIndex={activeIndex} onClickHandler={goToIndex}/> */}
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

