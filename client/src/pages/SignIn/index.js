import React, { useState, useContext } from 'react';

import './styles.css';
import {Link} from 'react-router-dom';

import { AuthContext } from '../../context/auth';

export default function SignIn() {
    const {signIn } = useContext(AuthContext);


    ///Variaveis para login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event) {
        event.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            alert('Preencha todos os campos !!');
            return;
        }

        signIn(email, password);

        setEmail('');
        setPassword('');
    }

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

                    <button onClick={handleLogin}>Entrar</button>
                </form>
            </div>

            <div className='separator'></div>
            <Link to="/register">Cadastrar nova conta</Link>
        </section>
    );
}