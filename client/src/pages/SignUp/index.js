import React,{useState,useContext} from 'react';

import '../SignIn/styles.css';
import {MdEmail, MdLock, MdPerson} from 'react-icons/md';
import {Link} from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { toast } from 'react-toastify';


export default function SignUp() {
  const {signUp,loadingAuth} = useContext(AuthContext);

  ///Variaveis para cadastro
  const [nameRegister, setNameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleRegister(event) {
    event.preventDefault();
    
    if (nameRegister.trim() === '' || emailRegister.trim() === '' || passwordRegister.trim() === '' || passwordConfirm.trim() === '') {
      toast.info('Por favor, preencha todos os campos');
      return;
    }

    if (passwordRegister !== passwordConfirm) {
      toast.info('Por favor, digite as senhas iguais !!');
      return;
    }

    if (passwordRegister.length < 8 || passwordConfirm.length < 8) {
      toast.info('Por favor, coloque uma senha maior que pelo menos 8 caracteres');
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

    <div className='login-form'>
        <h1>Cadastrar Conta</h1>
        <div className='loginInputEmail'>
            <span><MdPerson/></span>
            <input
                type='text'
                placeholder='Digite seu nome'
                value={nameRegister}
                onChange={(value) => setNameRegister(value.target.value)}
            />
        </div>

        <div className='loginInputEmail'>
            <span><MdEmail/></span>
            <input
                type='email'
                placeholder='Digite seu email'
                value={emailRegister}
                onChange={(value) => setEmailRegister(value.target.value)}
            />
        </div>

        <div className='loginInputPassword'>
            <span><MdLock/></span>
            <input
                type='password'
                placeholder='Digite sua senha'
                value={passwordRegister}
                onChange={(value) => setPasswordRegister(value.target.value)}
            />
        </div>

        <div className='loginInputPassword'>
            <span><MdLock/></span>
            <input
                type='password'
                placeholder='Confirme sua senha'
                value={passwordConfirm}
                onChange={(value) => setPasswordConfirm(value.target.value)}
            />
        </div>

        <button onClick={handleRegister}>
          {loadingAuth ? 'Carregando...' : 'Cadastrar'}
        </button>

        
        <Link to="/">Já tem conta? Entrar na sua conta</Link>
    </div>
</section>
  );
}