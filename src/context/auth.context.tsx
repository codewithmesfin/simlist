
import React, { createContext, useContext, useEffect, useState } from "react";
import auth from "../service/auth.services";

type AuthContextType = {
    isAuthenticated: boolean;
    checkUserAuthentication: () => void;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    checkUserAuthentication: () => { },
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsDarkMode] = useState(false);

    useEffect(() => {
        checkUserAuthentication()
    }, [isAuthenticated]);

    const checkUserAuthentication = async () => {
        const authenticated = await auth.isAutenticated()
        setIsDarkMode(authenticated);
    };

    const value = { isAuthenticated, checkUserAuthentication };


    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );

};
