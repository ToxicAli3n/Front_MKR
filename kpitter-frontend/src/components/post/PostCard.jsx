import React, { useState } from 'react';
import { likePost, unlikePost } from '../../api';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(post.is_liked);
    const [likes, setLikes] = useState(post.likes);

    const toggleLike = async () => {
        const username = post.author.username;
        const postId = post.id;

        try {
            if (liked) {
                await unlikePost(username, postId);
                setLiked(false);
                setLikes(likes - 1);
            } else {
                await likePost(username, postId);
                setLiked(true);
                setLikes(likes + 1);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <div className="PostCard">
            <h3>{post.author.username}</h3>
            <p>{post.content}</p>
            <p>Likes: {likes}</p>
            <button onClick={toggleLike}>
                {liked ? 'Unlike' : 'Like'}
            </button>
        </div>
    );
};

export default PostCard;
