import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';
import {Form} from 'reactstrap';

export default function PetEmail() {
  const ownerid = document.getElementById("pet-email").innerHTML;
  console.log(`this is the owner id ${ownerid}`);
  const senderToken = localStorage.getItem('token');
  const sender_wholename = "Fred Savage";
  const from_email = "susan@knowledgedna.com";
  const subject = `Pettinder Message from ${sender_wholename}`;

  const firstname = owner.owner.firstname;
  const lastname = owner.owner.lastname;
  const wholename = firstname + ' ' + lastname;
  const to_email = "susanwulf@earthlink.net";

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