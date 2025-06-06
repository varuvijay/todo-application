import React, {  createContext, useEffect, useState } from 'react'

export const UserDetails = createContext();

export const UserDetailsProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(() => {
        const stored = localStorage.getItem("UserDetails");
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (err) {
                console.error("Error parsing localStorage data", err);
                return null;
            }
        }
        return null;
    });

    const [login, setLogin] = useState(false);
    const [signup , setSignup ] = useState(false);

    useEffect(() => {
        console.log("working");
        console.log(userDetails);
        if (login){
            console.log("Storing  data");            
            localStorage.setItem("UserDetails", JSON.stringify(userDetails));
        }

    }, [login])




    return (
        <UserDetails.Provider value={{ setLogin, userDetails, setUserDetails ,signup , setSignup}}>
            {children}
        </UserDetails.Provider>
    );
}