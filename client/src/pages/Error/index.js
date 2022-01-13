import React from 'react';

import { Link } from 'react-router-dom';
import './styles.css';

export default function Error() {
 return (
   <div className='container'>
       <h1>Error 404</h1>
       <p>Página não encontrada !!</p>
       <Link to="/">Voltar para a tela inicial</Link>
   </div>
 );
}