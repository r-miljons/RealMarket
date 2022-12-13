import React, { useState } from "react";
import "./AddListing.scss";
import DropArea from "./DropArea";
import { useAuthContext } from "../../hooks/useAuthContext";
import PicturePreviews from "./PicturePreviews";

export default function AddListing() {
    const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	// form data
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [location, setLocation] = useState("");
	const [pictures, setPictures] = useState([]);
	const { user } = useAuthContext();

	function handleSubmit(e) {
		e.preventDefault();

		async function sendData() {
			
			const response = await fetch(process.env.REACT_APP_SERVER_URL + "/listings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${user.token}`
				},
				body: JSON.stringify({
					title,
					description,
					price,
					location,
					pictures
				})
			});
			const data = await response.json();

			if (response.ok) {
				console.log("Success", data)
			} else if (!response.ok) {
				console.log(data)
				setError(data.error);
			}
		}
		sendData();
	}

	function removePicture(id) {
		setPictures(pictures.filter(img => img.id_encoded !== id));
	}

	return (
		<section className="item-section">
			<h2>Add a Listing</h2>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<div className="left">
						<div className="form-section">
							<label>Title</label>
							<input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
						</div>
						<div className="form-section">
							<label>Description</label>
							<textarea cols="30" rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
						</div>
						<div className="form-section">
							<label>Price</label>
							<input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
						</div>
						<div className="form-section">
							<label>Location</label>
							<input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
						</div>
						<button className="gradient-btn">Create</button>
					</div>

					<div className="image-upload-container">
						<label>Upload Images</label>
						<DropArea 
							setPictures={setPictures} 
							pictures={pictures} 
							setError={setError} 
							loading={loading} 
							setLoading={setLoading}
						/>
						<PicturePreviews pictures={pictures} removePicture={removePicture}/>
					</div>
				</form>
				{error && <div className="error">{error}</div>}
			</div>
		</section>
	);
}
