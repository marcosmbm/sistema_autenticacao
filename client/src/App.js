import React,{useState} from 'react';

import './styles.css';

import api from './services/api';

export default function App() {
    ///Usuario e email
    const [myName,setMyName] = useState('');
    const [myEmail,setMyEmail] = useState('');
    const [isLogged,setIsLogged] = useState(false);

    ///Variaveis para login
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    ///Variaveis para cadastro
    const [nameRegister,setNameRegister] = useState('');
    const [emailRegister,setEmailRegister] = useState('');
    const [passwordRegister,setPasswordRegister] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');


    function handleRegister(event){
        event.preventDefault();

        if(isLogged){
            alert('Por favor, saia primeiro da aplicação !!');
            return;
        }

        if(nameRegister.trim() === '' || emailRegister.trim() === '' || passwordRegister.trim() === '' || passwordConfirm.trim() === ''){
            alert('Por favor, preencha todos os campos');
            return;
        }

        if(passwordRegister !== passwordConfirm){
            alert('Por favor, digite as senhas iguais !!');
            return;
        }

        if(passwordRegister.length < 8 || passwordConfirm.length < 8){
            alert('Por favor, coloque uma senha maior que pelo menos 8 caracteres');
            return;
        }

        api.post('/register',{
            name: nameRegister,
            email: emailRegister,
            password: passwordRegister,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

        setNameRegister('');
        setEmailRegister('');
        setPasswordRegister('');
        setPasswordConfirm('');
    }

    function handleLogin(event){
        event.preventDefault();
        
        if(email.trim() === '' || password.trim() === ''){
            alert('Preencha todos os campos !!');
            return;
        }

        api.post('/login',{
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response.data);
            setMyName(response.data.nome);
        })
        .catch((error) => {
            console.log(error);
        });
        setIsLogged(true);
        setEmail('');
        setPassword('');
    }

    function handleSignOut(){
        setIsLogged(false);
        setMyName('');
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

      {isLogged ? (
          <div>
              <h3>{myName}</h3>
              <button onClick={handleSignOut}>Sair</button>
          </div>
      )
      :
      null
    }
   </section>
 ); 
}