import { createContext , useState  } from "react";
import React from 'react'

export const UserContext = createContext();
const UserProvider = ({children}) => {
    const [user, setUser] = useState({name: 'Demo_user', email: 'Demo_email'});
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;
