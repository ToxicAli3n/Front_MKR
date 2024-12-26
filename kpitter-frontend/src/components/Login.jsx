import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await registerUser({ username, password, full_name: fullName });
            }
            await loginUser({ username, password });
            localStorage.setItem('authToken', btoa(`${username}:${password}`));
            localStorage.setItem('username', username);
            onLogin();
            navigate('/profile');
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {isRegistering && (
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
            )}
            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            <p onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Log in' : 'Don\'t have an account? Register'}
            </p>
        </form>
    );
};

export default Login;
