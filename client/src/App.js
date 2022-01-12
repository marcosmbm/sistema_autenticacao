import React from 'react';

import './styles.css';

import AuthProvider from './context/auth';
import SignIn from './pages/SignIn';

export default function App() {

 return (
   <AuthProvider>
       <SignIn/>
   </AuthProvider>
 ); 
}