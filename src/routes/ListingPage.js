import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ListingPage.scss";

export default function ListingPage() {
	const [listing, setListing] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		async function getListing() {
			try {
				const response = await fetch(
					process.env.REACT_APP_SERVER_URL + "/listings/" + id
				);
				const data = await response.json();
				console.log(data);
				setListing(data.data);
				setLoading(false);
				setError(false);
			} catch (err) {
				setLoading(false);
				setError(err.message || err);
			}
		}
		getListing();
	}, []);

	function renderListing() {
		return (
			<div className="large-item-card">
				<img
					src={listing.pictures[0].url || process.env.REACT_APP_PLACEHOLDER_IMG}
					alt="product"
					onError={renderDefaultImage}
				/>
				<div className="product-details">
					<div className="top">
						<h3>{listing.title}</h3>
						<p>{listing.description}</p>
					</div>
					<div className="bottom">
						<div className="price-container">
							<span>{listing.location}</span>
							<p>{listing.price} €</p>
						</div>
            <div className="seller-info">
              {/* TODO: Add seller info */}
            </div>
					</div>
				</div>
			</div>
		);
	}

	function renderDefaultImage(e) {
		const backupImage = process.env.REACT_APP_PLACEHOLDER_IMG;
		if (e.target.src !== backupImage) {
			e.target.src = backupImage;
		}
	}

	function renderLoadingPlaceholder() {
		return (
			<div className="large-item-card-loading">
				<div className="picture"></div>
				<div className="product-details">
					<div className="top">
						<div className="title"></div>
						<div className="description"></div>
					</div>
					<div className="bottom">
						<div className="price"></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="page-container dark-background">
			<div className="page-padding">
        <h2>Listing</h2>
				{!loading ? renderListing() : renderLoadingPlaceholder()}
			</div>
		</div>
	);
}
