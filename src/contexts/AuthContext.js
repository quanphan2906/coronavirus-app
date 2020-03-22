import React, { createContext, useState, useEffect } from "react";
import services from "../services";

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [auth, setAuth] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const trackUser = user => {
        setAuth(user);
        setIsAuthReady(true);
    };
    useEffect(() => {
        const unsubscribe = services.trackUser(trackUser);
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <AuthContext.Provider
            value={{ auth, setAuth, isAuthReady, setIsAuthReady }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
