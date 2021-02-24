import React, {useState, useEffect} from 'react';
import emailjs from 'emailjs-com';
import {Form} from 'reactstrap';

const PetEmail = (props) => {

  const [sendFromEmail, setSendFromEmail] = useState('');
  const [userToken, setUserToken] = useState(props.token);
  const [currentUser, setCurrentUser] = useState('');
  const [owner, setOwner] = useState(props.owner);
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [wholename, setwholename] = useState('');

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
    <form onSubmit={sendEmail} style={{position: 'relative', top: 200 + "px"}}>
      <label>Name</label>
      <input type="text" name="wholename" value={wholename}/>
      <label>testemail</label>
      <input type="text" name="testemail" value="susanwulf@earthlink.net"/>
      <label>Email</label>
      <input type="email" name="from_email" />
      <label>Subject</label>
      <input type="text" name="subject" />
      <label>Message</label>
      <textarea name="html_message" />
      <input type="submit" value="Send" />
    </form>
  );
  
}

export default PetEmail;