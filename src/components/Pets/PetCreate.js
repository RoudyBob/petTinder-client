import React, { useState, useRef } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

const PetCreate = (props) => {
    const [dogname, setDogName] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [citylocation, setCityLocation] = useState('');
    const [statelocation, setStateLocation] = useState('');
    const [description, setDescription] = useState('');
    const [photourl, setPhotoUrl] = useState('');

    const [file, setFile] = useState(''); // storing the uploaded file  
    const [data, getFile] = useState({ name: "", path: "" }); // storing the recived file from backend
    const [fileInputKey, setFileInputKey] = useState('');

    const formStyle={
        backgroundColor: "white",
        padding: "40px",
        width: "400px",
        marginTop: "60px"
    }

    const titleStyle={
        color: "coral",
        letterSpacing: "-1px"
    }
    const buttonStyle={
        backgroundColor: "coral",
        border: "none",
        marginTop: "10px",
        marginBottom: "10px"
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadFile();
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
            setFileInputKey(Date.now()); //resets key on File Input which re-renders it to clear out filename
            props.fetchPets();
        })
        .catch((err) => console.log(err));
    }

    const fileInputChange = (e) => {
        const file = e.target.files[0]; // accessing file
        // console.log("Old File");
        // console.log(file);
        
        let regEx = /(?:\.([^.]+))?$/;
        const {lastModified, lastModifiedDate, name, size, type, webkitRelativePath} = file;
        let newFileName = Math.random().toString(36).substring(2) + "." + regEx.exec(name)[1];

        // https://stackoverflow.com/questions/21720390/how-to-change-name-of-file-in-javascript-from-input-file
        const newFile = new File ([file], newFileName, {
            lastModified: lastModified,
            lastModifiedDate: lastModifiedDate,
            name: Math.random().toString(36).substring(2) + "." + regEx.exec(name)[1],
            size: size,
            type: type,
            webkitRelativePath: webkitRelativePath
        });

        // console.log("New File");
        // console.log(newFile);
        setFile(newFile); // storing file
        setPhotoUrl(`http://localhost:3000/${newFile.name}`);
    }

    const uploadFile = () => {
        const formData = new FormData();   
        // console.log(`photourl variable: ${photourl}`)
        formData.append('file', file); // appending file
        axios.post('http://localhost:3000/upload', formData)
        .then(res => {
            console.log(res);
            getFile({ name: res.data.name, path: 'http://localhost:3000' + res.data.path })
        })
        .catch(err => console.log(err))}

    return ( 
        <>
            
            <Form onSubmit={handleSubmit} style={formStyle}>
                <FormGroup>
                    <center><h3 style={titleStyle}>submit your pooch!</h3></center>
                    <Label htmlFor="dogname">Dog's Name</Label>
                    <Input name="Name" placeholder="Spot" autocomplete="off" value={dogname} onChange={(e) => setDogName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="breed">Breed</Label>
                    <Input name="breed" placeholder="Poodle" autocomplete="off" value={breed} onChange={(e) => setBreed(e.target.value)} />
                    </FormGroup>
                <FormGroup>
                    <Label htmlFor="gender">Gender</Label>
                    <Input type="select" name="Gender" autocomplete="off" value={gender} onChange={(e) => setGender (e.target.value)}>
                    <option></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="citylocation">City</Label>
                    <Input name="City" placeholder="Anytown" autocomplete="off" value={citylocation} onChange={(e) => setCityLocation(e.target.value)} />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="statelocation">State (2-letter abbr)</Label>
                    <Input name="state" pattern="|AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY|" autocomplete="off" placeholder="State" value={statelocation} onChange={(e) => setStateLocation(e.target.value)} />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="description">Description</Label>
                    <Input name="Description" autocomplete="off" placeholder="Tell us about your dog!" value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="photourl">Select a photo:</Label>
                    {/* <Input name="Photo of Pet (URL)" value={photourl} onChange={(e) => setPhotoUrl(e.target.value)} onClick={clearPhoto}/> */}
                    {/* <Input type="file" id="petphoto" ref={el} onChange={handleChange}/> */}
                    <Input type="file" id="photopicker" accept="image/*" onChange={fileInputChange} key={fileInputKey} />
                </FormGroup>
                <center><Button type="submit" style={buttonStyle}>Click to Submit</Button></center>
            </Form>
        </>
     );
}
 
export default PetCreate;