import {useState,createContext,useEffect} from 'react';

import api from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({children}){
    ///Meu objeto de usuario
    const [user,setUser] = useState(null);

    useEffect(() => {
        function loadStorage(){
            const storageUser = localStorage.getItem('Users');

            if(storageUser){
                setUser(JSON.parse(storageUser));
            }
        }
        loadStorage();
    },[]);

    ///Função responsável para cadastrar
    async function signUp(name,email,password){
        await api.post('/register',{
            name: name,
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    ///Função responsável para logar
    async function signIn(email,password){
        await api.post('/login',{
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response.data);

            let data = {
                nome: response.data.nome,
                email: response.data.email
            }

            setUser(data);
            storageUser(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function storageUser(data){
        localStorage.setItem('Users', JSON.stringify(data));
    }

    function signOut(){
        localStorage.removeItem('Users');
        setUser(null);
    }



    return(
        <AuthContext.Provider
            value={{
                user,
                signUp,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;