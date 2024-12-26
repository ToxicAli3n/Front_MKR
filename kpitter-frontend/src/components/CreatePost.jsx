import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    if (!username) {
        navigate('/login');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.trim() === '') {
            setMessage('Content cannot be empty');
            return;
        }
        setLoading(true);
        try {
            const response = await createPost(username, { content });
            console.log('Post created successfully:', response);
            setMessage('Post created successfully!');
            setLoading(false);
            navigate(`/users/${username}/posts`);
        } catch (error) {
            console.error('Error creating post:', error);
            setMessage('Error creating post');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            {message && <p>{message}</p>}
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Post'}
            </button>
        </form>
    );
};

export default CreatePost;
