import React, { useState } from 'react';
import DashBoard from './DashBoard';

export function SignIn() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({username: username, password: password})
        };
        fetch('http://localhost:8080/authenticate/login', requestOptions)
            .then(response => {
                console.log(requestOptions)
                return response.json()
            })
            .then(data => {
                console.log(data.status)
                console.log(data.token)
                if(data.status="success")
                {
                    setToken(data.token)
                    setStatus(data.status)
                    localStorage.setItem("token",data.token)
                }
                
            })
            .catch(error => {
                console.log(error)
            })

    }



    return (

        <form onSubmit={handleSubmit} >
            <label>User Name</label>
            <input type="text" value={username} onChange={event => setUserName(event.target.value)} />
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={event => setPassword(event.target.value)}></input>
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>

        </form>
    );
}