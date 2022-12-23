import React, { useEffect, useState } from 'react';
import "./Comments.scss";
import thumbsIcon from "../../assets/thumbs-up.svg";
import thumbsOffIcon from "../../assets/thumbs-up-off.svg";
import { useAuthContext } from '../../hooks/useAuthContext';
import AddComment from './AddComment';
import { formatDate } from '../../utils/formatDate';

const Comments = ({ listing }) => {
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  // FETCH COMMENTS
  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + '/comments/' + listing._id);
        const data = await response.json();

        if (response.ok) {
          setLoading(false);
          setComments(data.data)
        }
        if (!response.ok) {
          setLoading(false);
          setError("Something went wrong while trying to load the comments")
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
              <span>{formatDate(comment.createdAt)}</span>
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

    // handle like on the frontend
    setComments(prevState => {

      // create an array to store updated comments
      const updatedComments = [];

      
      // go through the comments, and find the liked comment
      prevState.forEach(comment => {

        if (comment._id === id) {
          // create an array of ids from all the users that liked the comment
          let likedIds = [];
          comment.likes.forEach(like => {
            likedIds.push(like._id);
          })
          
          // check if the current users id is in the array of likedIds
          if (likedIds.includes(user.id)) {
            
            // if it is, remove the like from likes
            comment.likes = comment.likes.filter(like => like._id !== user.id);

          } else {
            // if not add a like to likes
            comment.likes.push({_id: user.id, username: user.username})
          }
        
        }
        updatedComments.push(comment);
      });

    // return updated comments
    return [...updatedComments];

    });

    // send like to backend
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
        <AddComment listing={listing} setComments={setComments}/>
        <div className='comments'>

          {comments.length > 0 ? renderUserComments() : (
            <p className='no-comment'>{loading ? "" : "No comments to show, be the first to comment!"}</p>
          )}

        </div>
      </div>
      
    </div>
  );
};

export default Comments;
