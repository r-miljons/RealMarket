import React, { useState } from "react";
import "./Comments.scss";
import sendIcon from "../../assets/send.svg";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function AddComment({ listing }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  // HANDLE COMMENT SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        setError("Login to add a comment.");
        return;
    }

    if (error) {
        setError("");
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
        setError(data.error);
      }
   
    } catch (err) {
      setError(err.message);
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
        {error && <div className="error">{error}</div>}
        </>
	);
}
