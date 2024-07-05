import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import {jwtDecode} from 'jwt-decode';

export default function Signup() {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('User Details:', decoded);
    
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}