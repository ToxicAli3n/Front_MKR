import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../api';
import Post from './Post';
import './Posts.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("Fetching all posts...");
                const response = await getAllPosts();
                console.log("Posts fetched:", response);
                setPosts(response);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="posts-container">
            <h2>All Posts</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="posts-list">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))
                    ) : (
                        <p>Not Found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Posts;
