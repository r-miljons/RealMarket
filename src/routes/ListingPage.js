import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userIcon from "../assets/user.svg";
import mailIcon from "../assets/mail.svg";
import phoneIcon from "../assets/phone-call.svg";
import pinIcon from "../assets/map-pin.svg";
import "./ListingPage.scss";
import Comments from "../components/Comments/Comments";
import MarketplaceFP from "../components/MarketplaceFP/MarketplaceFP";

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
			<>
				<div className="item-section-listing-page">
					<div className="left">
						<div className="image-wrapper">
							<img
								src={listing.pictures[0].url || process.env.REACT_APP_PLACEHOLDER_IMG}
								alt="product"
								onError={renderDefaultImage}
							/>
						</div>
						<div className="listing-data">
							<p className="posted-at">Posted: {listing.createdAt}</p>
							<div className="seller-info">
								<div>
									<img src={userIcon} alt="icon" />
									<p>{listing.user.username}</p>
								</div>
								<div>
									<img src={mailIcon} alt="icon" />
									<p>listing.user.email</p>
								</div>
								<div>
									<img src={phoneIcon} alt="icon" />
									<p>listing.user.phone</p>
								</div>
							</div>
						</div>
					</div>
					<div className="right">
						<h3>{listing.title}</h3>
						<p>{listing.description}</p>
						<div className="location">
							<img src={pinIcon} alt="icon" />
							<p>{listing.location}</p>
						</div>
						<p className="price">{listing.price} €</p>
					</div>
				</div>
			</>
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

	function renderCommentsSection() {
		return <Comments listingId={listing._id} />;
	}

	return (
		<div className="page-container dark-background">
			<div className="item-wrapper">
				{!loading ? renderListing() : renderLoadingPlaceholder()}
			</div>	
			<div className="page-padding">
				{listing && renderCommentsSection()}
				<MarketplaceFP />
			</div>
		</div>
	);
}