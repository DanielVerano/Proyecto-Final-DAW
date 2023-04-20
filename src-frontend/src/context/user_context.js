import React, { useContext, useEffect, useState } from 'react'

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [myUser, setMyUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && !myUser) {
            setMyUser(user);
        }
    }, [myUser]);

    return (
        <UserContext.Provider value={{ myUser, setMyUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}