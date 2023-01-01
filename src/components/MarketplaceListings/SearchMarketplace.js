import React, { useState } from "react";
import "./SearchMarketplace.scss";

export default function SearchMarketplace({setSearchString, placeholder}) {
    const [text, setText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (text.trim() === "") {
            setSearchString("");
        } else {
            setSearchString(text);
        } 
    }

	return (
		<div className="search-wrapper">
			<form onSubmit={handleSubmit}>
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder={placeholder}
				/>
				<button type="submit" className="search">
					<span className="material-symbols-outlined">search</span>
				</button>
			</form>
		</div>
	);
}
