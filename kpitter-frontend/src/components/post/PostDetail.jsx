import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../../api';
import './PostDetali.css';

const PostDetail = () => {
    const { username, postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPost(username, postId);
                setPost(response);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [username, postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="post-detail">
            <h3>Post by {post.author.username}</h3>
            <p>{post.content}</p>
            <p>Likes: {post.likes}</p>
        </div>
    );
};

export default PostDetail;
