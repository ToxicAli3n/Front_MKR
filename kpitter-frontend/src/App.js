import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/profile/Profile';
import CreatePost from './components/CreatePost';
import Posts from './components/post/Posts';
import PostDetail from './components/post/PostDetail';
import UserPage from './components/userpage/UserPage';
import './styles.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setIsAuthenticated(authToken !== null);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Welcome to KPI-tter</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/posts">View Posts</Link></li>
                            {!isAuthenticated ? (
                                <li><Link to="/login">Login/Register</Link></li>
                            ) : (
                                <li><Link to="/profile">Profile</Link></li>
                            )}
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/profile" element={<Profile onLogout={() => setIsAuthenticated(false)} />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/users/:username/posts" element={<UserPage />} />
                    <Route path="/users/:username/posts/:postId" element={<PostDetail />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
