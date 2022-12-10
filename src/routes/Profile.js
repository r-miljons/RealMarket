import React from "react";
import AddListing from "../components/AddListing/AddListing";
import ProfileHero from "../components/Hero/ProfileHero";
import MyListings from "../components/MyListings/MyListings";
import "../index.scss";

export default function Profile() {
	return (
		<div className="page-container dark-background">
			<ProfileHero />
            <div className="page-padding">
                <MyListings />
				<AddListing />
            </div>
		</div>
	);
}
