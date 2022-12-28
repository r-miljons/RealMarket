import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { formatDate } from "../../utils/formatDate";
import thumbsIcon from "../../assets/thumbs-up.svg";
import thumbsOffIcon from "../../assets/thumbs-up-off.svg";
import "./Comments.scss";
import ClickOutsideWrapper from "../../utils/ClickOutsideWrapper";
import { useErrorContext } from "../../hooks/useErrorContext";

export default function Comment({comment, setComments}) {
    const {dispatch} = useErrorContext();
    const { user } = useAuthContext();
    const [openMore, setOpenMore] = useState(false);

    const likedIds = comment.likes.map(like => {
        return like._id
      })

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
                
            //   // create an array of ids from all the users that liked the comment
            //   let likedIds = [];
            //   comment.likes.forEach(like => {
            //     likedIds.push(like._id);
            //   })
              
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
          
          if (data.error) {
            dispatch({type: "SET_ERROR", payload: data.error})
          }

        } catch (err) {
            dispatch({type: "SET_ERROR", payload: err.message})
        }
    }

    async function handleCommentDelete(id) {
        try {
            // Send the comment to the server
            const response = await fetch(process.env.REACT_APP_SERVER_URL + '/comments/' + id, {
              method: 'DELETE',
              headers: {
                "Authorization": "Bearer " + user.token
              }
            });

            if (response.ok) {
                setComments(prevState => {
                    let updatedComments = prevState.filter(comment => comment._id !== id);
                    return updatedComments;
                });
            }
            if (!response.ok) {
                dispatch({type: "SET_ERROR", payload: "Something went wrong while trying to delete the comment"})
            }
      
          } catch (err) {
            dispatch({type: "SET_ERROR", payload: err.message})
          }
    }

	return (
		<div className="user-comment">
			<div className="title">
				<h3>{comment.user.username}</h3>
				{user && comment.user._id === user.id && (
                    <div className="more">
                        <span className="material-symbols-outlined" onClick={() => {setOpenMore(!openMore)}}>more_vert</span>
                        {openMore && <div className="module">
                                <ClickOutsideWrapper setIsOpen={setOpenMore}>
                                <ul>
                                    <li onClick={() => handleCommentDelete(comment._id)}>Delete</li>
                                </ul>
                                </ClickOutsideWrapper>
                            </div>}
                    </div>
				)}
				<span>{formatDate(comment.createdAt)}</span>
			</div>
			<div className="text">
				<p>{comment.text}</p>
			</div>

			{user ? (
				<div className={likedIds.includes(user.id) ? "likes" : "likes off"}>
					<img
						src={likedIds.includes(user.id) ? thumbsIcon : thumbsOffIcon}
						alt="icon"
						onClick={() => handleCommentLike(comment._id)}
					/>
					<p>{likedIds.length}</p>
				</div>
			) : (
				<div className="likes off">
					<img
						src={thumbsOffIcon}
						alt="icon"
						onClick={() => handleCommentLike(comment._id)}
					/>
					<p>{likedIds.length}</p>
				</div>
			)}
		</div>
	);
}
