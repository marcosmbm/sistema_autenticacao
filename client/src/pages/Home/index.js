import React,{useState,useContext} from 'react';

import { AuthContext } from '../../context/auth';

export default function Home() {

  const {user, signOut} = useContext(AuthContext);

 return (
   <div>
       <h1>{user.nome}</h1>
       <button onClick={() => signOut()}>Fazer logout</button>
   </div>
 );
}