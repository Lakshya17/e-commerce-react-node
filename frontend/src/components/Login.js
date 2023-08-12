import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })
    const handleLogin = async () => {
        console.log(email, password)
        let result = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('key', JSON.stringify(result.auth))
            navigate('/')
        }else{
            alert('Please enter correct details')
        }
    }


    return(
        <div className="login">
            <h1>Login</h1>
            <input className="inputBox" onChange={(e) => setEmail(e.target.value) } value={email} type='text' placeholder='Enter Email' />
            <input className="inputBox" onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Enter Password' />
            <button onClick={handleLogin} type="button">Login</button>
        </div>
    )
}

export default Login;