import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

export default function SignIn() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        fetch('http://localhost:8080/authenticate/login', requestOptions)
            .then(response => {

                return response.json()
            })
            .then(data => {
                /* TBD token expiry time needs to be set while saving token to local storage*/
                if (data.status === "success") {
                    localStorage.setItem("token", data.token)
                }

                history.push("/dashboard")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="App">
            <form className="SignIN" onSubmit={handleSubmit} >
                <input className="inputText" required="required" type="text" placeholder="USERNAME" value={username} onChange={event => setUserName(event.target.value)} />
                <div>
                    <input className="inputText" required="required" type="password" placeholder="PASSWORD" value={password} onChange={event => setPassword(event.target.value)}></input>
                </div>
                <div>
                    <input className="inputSubmit" type="submit" value="Login" />
                </div>
            </form>
        </div>
    );
}