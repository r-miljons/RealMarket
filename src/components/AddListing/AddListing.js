import React from "react";
import "./AddListing.scss";

export default function AddListing() {
	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<section className="item-section">
			<h2>Add a Listing</h2>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<div className="left">
						<div className="form-section">
							<label>Title</label>
							<input type="text" />
						</div>
						<div className="form-section">
							<label>Description</label>
							<textarea cols="30" rows="5"></textarea>
						</div>
						<div className="form-section">
							<label>Price</label>
							<input type="number" />
						</div>
						<div className="form-section">
							<label>Location</label>
							<input type="text" />
						</div>
						<button className="gradient-btn">Create</button>
					</div>

					<div className="image-upload-container">
						<label>Upload Images</label>
						<div className="upload-section">
							<span className="material-symbols-outlined">
								add_photo_alternate
							</span>
							<p>
								Drop your images here or click the icon to upload your
								images
							</p>
                            <input type="file" />
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}
