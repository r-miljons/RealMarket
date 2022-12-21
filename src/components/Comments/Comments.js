import React, { useState } from 'react';
import "./Comments.scss";
import sendIcon from "../../assets/send.svg";

const Comments = ({ listingId }) => {
  const [commentText, setCommentText] = useState('');

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the comment to the server here

    // Clear the form after the comment is submitted
    setCommentText('');
  };

  return (
    <div className='comments-section'>
      <h2>Comment</h2>
      <div className='comments-wrapper'>
        <form onSubmit={handleSubmit}>
          <input value={commentText} onChange={handleChange} placeholder="Tell your thoughts..."/>
          <button type="submit">
            <img src={sendIcon} alt="icon" />
          </button>
        </form>
        <div className='comments'>
          <div className='user-comment'>
            <div className="title">
              <h3>comment.user.username</h3>
              <span>2 days ago</span>
            </div>
            <div className='text'>
              <p>Hey Sam, I have a question that I couldn't find an answer to so far: How do you deal with different seasons like winter for instance?</p>
            </div>
          </div>
          <div className='user-comment'>
            <div className="title">
              <h3>comment.user.username</h3>
              <span>2 days ago</span>
            </div>
            <div className='text'>
              <p>Hey Sam, I have a question that I couldn't find an answer to so far: How do you deal with different seasons like winter for instance?</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Comments;
