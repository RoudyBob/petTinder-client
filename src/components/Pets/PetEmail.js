import React, {useState, useEffect} from 'react';
import emailjs from 'emailjs-com';
import {Form} from 'reactstrap';

const PetEmail = (props) => {

  const ownerid = document.getElementById("pet-email").innerHTML;
  const [sendFromEmail, setSendFromEmail] = useState('');
  const [userToken, setUserToken] = useState(props.token);
  const [currentUser, setCurrentUser] = useState('');
  const [owner, setOwner] = useState(props.owner);
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [wholename, setwholename] = useState('');
  
  const sender_wholename = currentUser.firstname + ' ' + currentUser.lastname;
  const from_email = currentUser.username;
  const subject = `Pettinder Message from ${sender_wholename}`;
  const to_email = "susanwulf@earthlink.net";

  const getCurrentUser = () => {
    fetch ('http://localhost:3000/user/current', {
      method: 'GET',
      headers: new Headers ({
        'Content-Type': 'application-json',
        'Authorization': userToken
      })
    })
      .then((response) => response.json())
      .then((user) => { 
        console.log(`Logged In User: ${user.username}`)
        setCurrentUser(user);
      })
  };

  useEffect(() => {
    getCurrentUser();
    setfirstname(owner.firstname);
    setlastname(owner.lastname);
    setwholename(firstname + ' ' + lastname);
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
      <input type="hidden" name="firstname" value={firstname}/>
      <input type="hidden" name="sender_wholename" value={sender_wholename}/>
      <input type="hidden" name="to_email" value={to_email}/>
      <input type="hidden" name="from_email" value={from_email}/>

      <table>
        <tr>
          <td><label>Owner Name:&nbsp;</label></td>
          <td><input type="text" name="wholename" value={wholename}/></td>
        </tr> 
        <tr>
          <td><label>Subject:&nbsp;</label></td>
          <td><input type="text" name="subject" value={subject}/></td>
        </tr> 
        <tr>
          <td><label>Message:&nbsp;</label></td>
          <td><textarea name="message" /></td>
        </tr>
      <input type="submit" value="Send" />
      </table>
    </form>
  );
}

export default PetEmail;
