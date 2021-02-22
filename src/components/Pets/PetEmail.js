import React from 'react';
import emailjs from 'emailjs-com';
import {Form} from 'reactstrap';

export default function PetEmail(owner) {
  console.log(owner.owner.firstname)
  console.log('hi')
  const firstname = owner.owner.firstname;
  const lastname = owner.owner.lastname;
  const wholename = firstname + ' ' + lastname;

  function sendEmail(e) {
    e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

    emailjs.sendForm('service_vydnlz7', 'template_apq5fn7', e.target, 'user_j7jbBi9i8Kzp0HMHzjPsF')
      .then((result) => {
          window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
      }, (error) => {
          console.log(error.text);
      });
  }
  console.log('hi again');
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