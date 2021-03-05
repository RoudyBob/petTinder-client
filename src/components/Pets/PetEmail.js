import React, {useState, useEffect} from 'react';
import emailjs from 'emailjs-com';
import {Form, NavItem} from 'reactstrap';
import APIURL from '../../helpers/environment';

const PetEmail = (props) => {

  const ownerid = document.querySelector("div.carousel-item.active > div > div.pet-carousel > div#pet-email").innerHTML;
  
  const [userToken, setUserToken] = useState(props.token);
  const [currentUser, setCurrentUser] = useState('');
  const [owner, setOwner] = useState(props.owner);
  const [ownerFirstName, setOwnerFirstName] = useState('');
  const [ownerUserName, setOwnerUserName] = useState('');
  const [ownerLastName, setOwnerLastName] = useState('');

  const getOwner = () => {
    let url = `${APIURL}/user/byid/${ownerid}`
    console.log(`this is the url ${url}`)
    fetch(url, {
      method: 'GET',
      headers: new Headers ({
        'Content-Type': 'application-json'
      })
    })
    .then((response) => response.json())
    .then((owner) => {
      // console.log(`Pet Owner username: ${owner.username}`)
      setOwner(owner);
      setOwnerFirstName(owner.firstname);
      setOwnerLastName(owner.lastname);
      setOwnerUserName(owner.username);
    })
  }

  const getCurrentUser = () => {
    fetch (`${APIURL}/user/current`, {
      method: 'GET',
      headers: new Headers ({
        'Content-Type': 'application-json',
        'Authorization': userToken
      })
    })
      .then((response) => response.json())
      .then((user) => { 
        // console.log(`Logged In User: ${user.username}`)
        setCurrentUser(user);
      })
  };

  useEffect(() => {
    getCurrentUser();
    getOwner();
  }, []);

  function sendEmail(e) {
    e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    emailjs.sendForm('service_vydnlz7', 'template_apq5fn7', e.target, 'user_j7jbBi9i8Kzp0HMHzjPsF')
      .then((result) => {
          window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <form onSubmit={sendEmail}>
      <input type="hidden" name="firstname" value={ownerFirstName}/>
      <input type="hidden" name="sender_wholename" value={`${currentUser.firstname} ${currentUser.lastname}`}/>
      <input type="hidden" name="to_email" value={ownerUserName}/>
      <input type="hidden" name="from_email" value={currentUser.username}/>

      <table>
        <tr>
          <td><label>Owner Name:&nbsp;</label></td>
          <td><input type="text" name="wholename" value={`${ownerFirstName} ${ownerLastName}`}/></td>
        </tr> 
        <tr>
          <td><label>Subject:&nbsp;</label></td>
          <td><input type="text" name="subject" value={`Pettinder Message from ${currentUser.firstname} ${currentUser.lastname}`}/></td>
        </tr> 
        <tr>
          <td><label>Message:&nbsp;</label></td>
          <td><textarea name="message" /></td>
        </tr>
        <tr>
          <td colspan = "2">
        <center><div><input type="submit" value="Send" class="submitbutton"/></div></center>
        </td>
        </tr>
      </table>
    </form>
  );
}

export default PetEmail;
