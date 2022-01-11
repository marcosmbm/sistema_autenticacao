import React,{useState} from 'react';

import './styles.css';

export default function App() {

    ///Variaveis para login
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    ///Variaveis para cadastro
    const [nameRegister,setNameRegister] = useState('');
    const [emailRegister,setEmailRegister] = useState('');
    const [passwordRegister,setPasswordRegister] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');

 return (
   <section className='container'>
      <div className='form-container'>
        <h2 className='title'>Login</h2>

        <form className='form'>
            <input
                type='email'
                placeholder='Seu email'
                value={email}
                onChange={(value) => setEmail(value.target.value)}
            />

            <input
                type='password'
                placeholder='Senha'
                value={password}
                onChange={(value) => setPassword(value.target.value)}
            />

            <button>Entrar</button>
        </form>
      </div>

      <div className='separator'></div>

      <div className='form-container'>
        <h2 className='title'>Cadastro</h2>

        <form className='form'>
            <input
                type='text'
                placeholder='Seu nome'
                value={nameRegister}
                onChange={(value) => setNameRegister(value.target.value)}
            />

            <input
                type='email'
                placeholder='Seu email'
                value={emailRegister}
                onChange={(value) => setEmailRegister(value.target.value)}
            />

            <input
                type='password'
                placeholder='Senha'
                value={passwordRegister}
                onChange={(value) => setPasswordRegister(value.target.value)}
            />

            <input
                type='password'
                placeholder='Confirmar senha'
                value={passwordConfirm}
                onChange={(value) => setPasswordConfirm(value.target.value)}
            />
            <button>Cadastrar</button>
        </form>
      </div>
   </section>
 ); 
}