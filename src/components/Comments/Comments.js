import React, { useEffect, useState } from 'react';
import "./Comments.scss";
import AddComment from './AddComment';
import Comment from './Comment';
import { useErrorContext } from '../../hooks/useErrorContext';

const Comments = ({ listing }) => {
  const {dispatch} = useErrorContext();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

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
          dispatch({type: "SET_ERROR", payload: "Something went wrong while trying to load the comments"})
        }

      } catch (err) {
        dispatch({type: "SET_ERROR", payload: err.message})
      }
    }
    getComments();
  }, [listing._id, dispatch])

  // RENDER COMMENTS
  function renderUserComments() {
    
      return comments.map(comment => {
        return (
          <Comment comment={comment} key={comment._id} setComments={setComments}/>
        );
      })
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
