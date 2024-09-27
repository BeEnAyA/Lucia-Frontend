import { ReactNode, useEffect } from 'react';
import { createContext, useContext, useMemo, useState } from "react";

interface AuthContextType {
    user: any;
    setUser: (value: any) => void;
    isAuthenticated: boolean;
    setIsAuthenticated(value: boolean): void;
}


const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, setIsAuthenticated: (value: boolean) => { value }, user: {}, setUser: (value: any) => { value } });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('isAuthenticated') as string) ?? false);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);


    const value = useMemo(() => ({
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated
    }),
        [isAuthenticated]
    );
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};

export const useAuth = () => {
    if (!AuthContext) {
        throw new Error("Auth Context is not available")
    }
    return useContext(AuthContext);

};