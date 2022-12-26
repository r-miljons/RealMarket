import React from "react";
import AddListing from "../components/AddListing/AddListing";
import ConfigureAccount from "../components/ConfigureAccount/ConfigureAccount";
import ProfileHero from "../components/Hero/ProfileHero";
import MyListings from "../components/MyListings/MyListings";
import "../index.scss";

export default function Profile() {
	return (
		<div className="page-container dark-background">
			<ProfileHero />
            <div className="page-padding">
				<ConfigureAccount />
				<AddListing />
                <MyListings />
            </div>
		</div>
	);
}
