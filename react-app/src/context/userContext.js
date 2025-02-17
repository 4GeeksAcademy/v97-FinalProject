import React, { createContext, useState, useEffect } from 'react';

import { auth } from '../firebase'

export const Context = createContext();

export default function ContextProvider(props) {

    const [user, setUser] = useState({});

    useEffect(() => {

        auth.onAuthStateChanged(async (user) => {
            console.log('In the onAuthStateChanged function');

            if (user) {

                console.log('User is signed in')

                const res = await fetch(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1/signUpOrSigninUser`, {
                    method: 'post',
                    body: JSON.stringify({ email: user.email }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                console.log('data', data);

                setUser(data.data);
            }
            else {

                console.log('User not signed in');
                setUser({});
            }
        })
    }, []);

    return (
        <Context.Provider value={{ user }}>
            {props.children}
        </Context.Provider>
    )
}