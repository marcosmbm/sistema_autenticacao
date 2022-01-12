import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function RouterWrapper({
    component: Component,
    isPrivate,
    ...rest
}){

    const {signed} = useContext(AuthContext);

    ///Caso ele esteja logado e queira entrar em uma rota privada, ele vai para tela de login
    if(!signed && isPrivate){
        return <Redirect to="/" />
    }

    ///Caso ele esteja logado e tenta ir para uma tela não privada, ele volta para a tela home
    if(signed && !isPrivate){
        return <Redirect to="/home"/>
    }

    return(
        <Route
            {...rest}
            render={props => (
                <Component {...props}/>
            )}
        />
    )
}