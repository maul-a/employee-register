import * as React from 'react';
import { useNavigate } from "react-router-dom";

import SignUpForm from './SignUpForm';


export default function SignUp() {
  
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch('http://localhost:1337/api/v1/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password'),
        email: data.get('email'),
        personalData: {
          role: data.get('role'),
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          address: {
            street: data.get('street'),
            streetNr: data.get('streetNr'),
            place: data.get('place'),
            ZIP: data.get('ZIP'),
            country: data.get('country'),
          }
        }
      })
    })
    const json = await response.json()
    navigate('/sign-in')
  };

  return (
    <SignUpForm handleSubmit={handleSubmit}/>
  )
}
