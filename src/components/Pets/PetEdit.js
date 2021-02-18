import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const PetEdit = (props) => {
    const [editName, setEditName] = useState(props.petToUpdate.dogname);
    const [editCity, setEditCity] = useState(props.petToUpdate.citylocation);
    const [editState, setEditState] = useState(props.petToUpdate.statelocation);
    const [editDescription, setEditDescription] = useState(props.petToUpdate.description);
    const [editPhotoUrl, setEditPhotoUrl] = useState(props.petToUpdate.photourl);
    

    const petUpdate = (event, pet) => {
        event.preventDefault();
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

    return(
        <Modal isOpen={true}>
            <ModalHeader>need to update some info?</ModalHeader>
            <ModalBody>
                <Form onSubmit={petUpdate}>
                    <FormGroup>
                        <Label htmlFor="dogname">Name:</Label>
                        <Input name="name" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="citylocation">City:</Label>
                        <Input name="city" value={editCity} onChange={(e) => setEditCity(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="statelocation">State:</Label>
                        <Input name="state" value={editState} onChange={(e) => setEditState(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Description:</Label>
                        <Input name="description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="photourl">Photo (URL):</Label>
                        <Input name="photo" value={editPhotoUrl} onChange={(e) => setEditPhotoUrl(e.target.value)} />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}
export default PetEdit;