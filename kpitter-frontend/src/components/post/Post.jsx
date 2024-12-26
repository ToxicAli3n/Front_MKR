import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { likePost, unlikePost } from '../../api';
import './Posts.css';

const Post = ({ post }) => {
    const [liked, setLiked] = useState(post.is_liked);
    const [likes, setLikes] = useState(post.likes);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const toggleLike = async () => {
        const username = post.author.username;
        const postId = post.id;

        setLoading(true);
        try {
            if (liked) {
                await unlikePost(username, postId);
                setLiked(false);
                setLikes(likes - 1);
                setMessage('Post unliked successfully!');
            } else {
                await likePost(username, postId);
                setLiked(true);
                setLikes(likes + 1);
                setMessage('Post liked successfully!');
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            setMessage('Error toggling like');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-card">
            <h3>
                <Link to={`/users/${post.author.username}/posts`}>
                    {post.author.username}
                </Link>
            </h3>
            <Link to={`/users/${post.author.username}/posts/${post.id}`} className="post-link">
                <p>{post.content}</p>
            </Link>
            <p>Likes: {likes}</p>
            <button onClick={(e) => {e.preventDefault(); toggleLike();}} disabled={loading}>
                {loading ? 'Processing...' : liked ? 'Unlike' : 'Like'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Post;
