import React, { useState } from "react";
import "./Comments.scss";
import sendIcon from "../../assets/send.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useErrorContext } from "../../hooks/useErrorContext";

export default function AddComment({ listing, setComments }) {
  const [text, setText] = useState("");
  const {dispatch} = useErrorContext();
  const { user } = useAuthContext();

  // HANDLE COMMENT SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        dispatch({ type: "SET_ERROR", payload: "Login to leave a comment" });
        return;
    }

    try {
      // Send the comment to the server
      const response = await fetch(process.env.REACT_APP_SERVER_URL + '/comments', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user.token
        },
        body: JSON.stringify({
          text,
          listing,
          user
        })
      });
      const data = await response.json();

      if (data.error) {
        dispatch({ type: "SET_ERROR", payload: data.error });
      }

      if (response.ok) {
        setComments(prevState => {
            return [data.data, ...prevState];
        })
      }
   
    } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
    }

    // Clear the form after the comment is submitted
    setText('');
  };

	return (
        <>
        <form onSubmit={handleSubmit}>
			<input
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Tell your thoughts..."
			/>
			<button type="submit">
				<img src={sendIcon} alt="icon" />
			</button>
		</form>
        </>
	);
}
