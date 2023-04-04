
import React, { createContext, useContext, useEffect, useState } from "react";
import auth from "../service/auth.services";

type AuthContextType = {
    isAuthenticated: boolean;
    checkUserAuthentication: () => void;
    token?:string
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    checkUserAuthentication: () => { },
    token:""
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token,setAccessToken]=useState("")

    useEffect(() => {
        checkUserAuthentication()
    }, [isAuthenticated]);

    const checkUserAuthentication = async () => {
        const authenticated = await auth.isAutenticated()
        const userToken=await auth.getToken()
        setIsAuthenticated(authenticated);
        setAccessToken(userToken)
    };

    const value = { isAuthenticated, checkUserAuthentication,token };


    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );

};
