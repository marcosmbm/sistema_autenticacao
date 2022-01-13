import React, { useState, useContext } from 'react';

import './styles.css';
import {Link} from 'react-router-dom';
import {MdEmail, MdLock} from 'react-icons/md';

import { AuthContext } from '../../context/auth';
import { toast } from 'react-toastify';

export default function SignIn() {
    const {signIn,loadingAuth } = useContext(AuthContext);


    ///Variaveis para login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event) {
        event.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            toast.info('Preencha todos os campos !!');
            return;
        }

        signIn(email, password);

        setEmail('');
        setPassword('');
    }

    return (
        <section className='container'>

            <div className='login-form'>
                <h1>Acessar App</h1>

                <div className='loginInputEmail'>
                    <span><MdEmail/></span>
                    <input
                        type='email'
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(value) => setEmail(value.target.value)}
                    />
                </div>

                <div className='loginInputPassword'>
                    <span><MdLock/></span>
                    <input
                        type='password'
                        placeholder='Digite sua senha'
                        value={password}
                        onChange={(value) => setPassword(value.target.value)}
                    />
                </div>

                <button onClick={handleLogin}>
                    {loadingAuth ? `Carregando...` : 'Entrar'}
                </button>

                <Link to="/register">Não tem conta? Cadastrar nova conta</Link>
            </div>
        </section>
    );
}