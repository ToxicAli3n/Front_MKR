import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ onLogout }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        onLogout();
        navigate('/');
    };

    if (!username) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Welcome, {username}!</h2>
            </div>
            <nav className="profile-nav">
                <ul>
                    <li><Link to="/create-post" className="profile-link">Create Post</Link></li>
                    <li><Link to={`/users/${username}/posts`} className="profile-link">View My Posts</Link></li>
                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default Profile;
