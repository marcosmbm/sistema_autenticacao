import React,{useState,useContext} from 'react';

import '../SignIn/styles.css';
import {Link} from 'react-router-dom';

import { AuthContext } from '../../context/auth';


export default function SignUp() {
  const {signUp} = useContext(AuthContext);

  ///Variaveis para cadastro
  const [nameRegister, setNameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleRegister(event) {
    event.preventDefault();
    
    if (nameRegister.trim() === '' || emailRegister.trim() === '' || passwordRegister.trim() === '' || passwordConfirm.trim() === '') {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (passwordRegister !== passwordConfirm) {
      alert('Por favor, digite as senhas iguais !!');
      return;
    }

    if (passwordRegister.length < 8 || passwordConfirm.length < 8) {
      alert('Por favor, coloque uma senha maior que pelo menos 8 caracteres');
      return;
    }

    signUp(nameRegister, emailRegister, passwordRegister)

    setNameRegister('');
    setEmailRegister('');
    setPasswordRegister('');
    setPasswordConfirm('');
  }

  return (
    <section className='container'>
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
        <button onClick={handleRegister}>Cadastrar</button>
      </form>
    </div>

    <div className='separator'></div>

    <Link to="/">Já tem conta cadastrada?</Link>
    </section>
  );
}