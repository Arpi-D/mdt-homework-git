import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';

export default function SignIn() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    
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
                if(data.status==="success")
                {
                    localStorage.setItem("token",data.token)
                }
                console.log("history" + history)
                history.push("/dashboard")
            })
            .catch(error => {
                console.log(error)
            })

    }



    return (
        <div className= "App">
        <form className = "SignIN" onSubmit={handleSubmit} >
            <input className= "inputText" type="text" placeholder="USERNAME" value={username} onChange={event => setUserName(event.target.value)} />
            <div>
                <input className= "inputText" type="password"  placeholder="PASSWORD" value={password} onChange={event => setPassword(event.target.value)}></input>
            </div>
            <div>
                <input className= "inputSubmit" type="submit" value="Login" />
            </div>
        </form>
        </div>
    );
}