import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './styles.css';

import Routes from './routes';

import AuthProvider from './context/auth';

export default function App() {

 return (
   <AuthProvider>
       <BrowserRouter>
          <Routes/>
       </BrowserRouter>
   </AuthProvider>
 ); 
}