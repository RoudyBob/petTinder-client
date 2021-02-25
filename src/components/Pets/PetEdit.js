import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import axios from 'axios';

const PetEdit = (props) => {
    const [editName, setEditName] = useState(props.petToUpdate.dogname);
    const [editCity, setEditCity] = useState(props.petToUpdate.citylocation);
    const [editState, setEditState] = useState(props.petToUpdate.statelocation);
    const [editDescription, setEditDescription] = useState(props.petToUpdate.description);
    const [editPhotoUrl, setEditPhotoUrl] = useState(props.petToUpdate.photourl);
    const [file, setFile] = useState(''); // storing the uploaded file  
    const [data, getFile] = useState({ name: "", path: "" }); // storing the recived file from backend
    const [fileInputKey, setFileInputKey] = useState('');

    const petUpdate = (event, pet) => {
        event.preventDefault();
        uploadFile();
        fetch(`http://localhost:3000/pet/${props.petToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({dogname: editName, citylocation: editCity, statelocation: editState, description: editDescription, photourl: editPhotoUrl}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then ((res) => {
            props.fetchPets();
            props.updateOff();
        })
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
        setEditPhotoUrl(`http://localhost:3000/${newFile.name}`);
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

    return(
        <Modal isOpen={true}>
            <h2 class="edithead">need to update some info?</h2>
            <ModalBody>
                <Form onSubmit={petUpdate}>
                    <FormGroup>
                        <Label htmlFor="dogname">Dog's Name</Label>
                        <Input name="name" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="citylocation">City</Label>
                        <Input name="city" value={editCity} onChange={(e) => setEditCity(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="statelocation">State (2-letter abbr))</Label>
                        <Input name="state" pattern="|AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY|" value={editState} onChange={(e) => setEditState(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input name="description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <img src={props.petToUpdate.photourl} width = "100px" />
                        <br />
                        <Label htmlFor="photourl">Current Photo</Label>

                        {/* <Input name="photo" value={editPhotoUrl} onChange={(e) => setEditPhotoUrl(e.target.value)} /> */}

                        <Input type="file" id="photopicker" accept="image/*" onChange={fileInputChange} key={fileInputKey} />
                    </FormGroup>
                    <Button type="submit" class="submitbutton2">Submit</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}
export default PetEdit;