import {useState,createContext,useEffect} from 'react';

import { toast } from 'react-toastify';

import api from '../services/api';

export const AuthContext = createContext({});

function AuthProvider({children}){
    ///Meu objeto de usuario
    const [user,setUser] = useState(null);
    const [loadingAuth,setLoadingAuth] = useState(false);

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
        setLoadingAuth(true);
        await api.post('/register',{
            name: name,
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response);
            if(response.data.msgError){
                toast.error(response.data.msgError);
                setLoadingAuth(false);
                return;
            }

            let data = {
                nome: response.data.nome,
                email: response.data.email,
                msgSucess: response.data.msgSucess
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success(data.msgSucess);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    ///Função responsável para logar
    async function signIn(email,password){
        setLoadingAuth(true);
        await api.post('/login',{
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response.data);
            
            if(response.data.msgError){
                toast.error(response.data.msgError);
                setLoadingAuth(false);
                return;
            }

            let data = {
                nome: response.data.nome,
                email: response.data.email,
                msgSucess: response.data.msgSucess
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success(data.msgSucess);
        })
        .catch((error) => {
            new Error(error);
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
                signed: !!user,
                user,
                loadingAuth,
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