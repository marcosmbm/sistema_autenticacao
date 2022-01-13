import 'react-toastify/dist/ReactToastify.css'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import {ToastContainer} from 'react-toastify';

import './styles.css';

import Routes from './routes';

import AuthProvider from './context/auth';

export default function App() {

 return (
   <AuthProvider>
       <BrowserRouter>
          <ToastContainer autoClose={3000}/>
          <Routes/>
       </BrowserRouter>
   </AuthProvider>
 ); 
}