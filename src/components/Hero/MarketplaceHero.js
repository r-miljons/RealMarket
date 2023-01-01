import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import heroImage from "../../assets/marketplace-img.svg";
import { useErrorContext } from "../../hooks/useErrorContext";

export default function MarketplaceHero() {
	const navigate = useNavigate();
	const { user } = useAuthContext();
    const { dispatch } = useErrorContext();

	function handleAddListing() {
		if (user) {
			navigate("/profile#add-listing");
		} else {
            dispatch({type: "SET_ERROR", payload: "Login to add a listing"});
        }
	}

	return (
		<section id="page-hero">
			<div className="content-wrapper">
				<div className="hero-left">
					<div className="hero-text">
						<h1>Marketplace</h1>
						<p>
							Browse through the user-created listings to find what you're
							looking for, or create your own listing to sell or offer
							something.
						</p>
					</div>
					<div className="hero-buttons">
						<button className="gradient-btn" onClick={handleAddListing}>
							Add a listing
						</button>
					</div>
				</div>

				<div className="hero-image-container">
					<img src={heroImage} alt="hero" />
				</div>
			</div>
		</section>
	);
}
