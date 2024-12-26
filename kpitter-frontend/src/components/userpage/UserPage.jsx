import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserPosts } from '../../api';
import Post from '../post/Post';
import './UserPage.css';

const UserPage = () => {
    const { username } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPosts = async () => {
            console.log(`Fetching posts for user: ${username}`);
            try {
                const response = await getUserPosts(username);
                console.log('User posts fetched:', response);
                setPosts(response);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [username]);

    return (
        <div className="user-page">
            <h2>{username}'s Posts</h2>
            <p>Number of Posts: {posts.length}</p>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="posts-list">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserPage;
