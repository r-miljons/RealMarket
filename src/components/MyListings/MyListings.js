import React from "react";
import "./MyListings.scss";
import emptyDocuments from "../../assets/empty-documents.svg";

export default function MyListings() {
	return (
		<div className="item-section">
			<h2>Your Listings</h2>
            <div className="large-card">
                <div className="card-text">
                    <h3>No listings to show</h3>
                    <p>Start by adding one.</p>
                    <button className="gradient-btn">Add a listing</button>
                </div>
                <img src={emptyDocuments} alt="empty documents" />
            </div>
		</div>
	);
}
