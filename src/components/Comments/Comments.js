import React, { useEffect, useState } from 'react';
import "./Comments.scss";
import thumbsIcon from "../../assets/thumbs-up.svg";
import thumbsOffIcon from "../../assets/thumbs-up-off.svg";
import { useAuthContext } from '../../hooks/useAuthContext';
import AddComment from './AddComment';

const Comments = ({ listing }) => {
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + '/comments/' + listing._id);
        const data = await response.json();

        if (response.ok) {
          setComments(data.data)
        }

      } catch (err) {
        setError(err.message);
      }
    }
    getComments();
  }, [listing._id])

  // RENDER COMMENTS
  function renderUserComments() {

      return comments.map(comment => {
        let likedIds = [];
        comment.likes.forEach(like => {
          likedIds.push(like._id);
        })

        return (
          <div className='user-comment' key={comment._id}>
            <div className="title">
              <h3>{comment.user.username}</h3>
              <span>{comment.createdAt}</span>
            </div>
            <div className='text'>
              <p>{comment.text}</p>
            </div>

            {
              user ? (
                <div className={likedIds.includes(user.id) ? 'likes' : 'likes off'}>
                  <img src={likedIds.includes(user.id) ? thumbsIcon : thumbsOffIcon} alt="icon" onClick={() => handleCommentLike(comment._id)}/>
                  <p>{likedIds.length}</p>
                </div>
              ) : (
                <div className='likes off'>
                  <img src={thumbsOffIcon} alt="icon" onClick={() => handleCommentLike(comment._id)}/>
                  <p>{likedIds.length}</p>
                </div>
              )
            }

            
            
          </div>
        );
      })
  }

  async function handleCommentLike(id) {
    // TODO: prompt user to login/signup if not already
    if (!user) return;

    try {
      // Send the comment to the server
      const response = await fetch(process.env.REACT_APP_SERVER_URL + '/comments/' + id, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user.token
        },
        body: JSON.stringify({
          likes: user
        })
      });
      const data = await response.json();

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className='comments-section'>
      <h2>Comment</h2>
      <div className='comments-wrapper'>
        <AddComment listing={listing}/>
        <div className='comments'>

          {comments.length > 0 ? renderUserComments() : (
            <p className='no-comment'>No comments to show, be the first to comment!</p>
          )}

        </div>
      </div>
      
    </div>
  );
};

export default Comments;
