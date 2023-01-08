import React from "react";
import AddListing from "../components/AddListing/AddListing";
import ConfigureAccount from "../components/ConfigureAccount/ConfigureAccount";
import ProfileHero from "../components/Hero/ProfileHero";
import MyListings from "../components/MyListings/MyListings";
import { useAuthContext } from "../hooks/useAuthContext";
import "../index.scss";

export default function Profile() {
	const { user } = useAuthContext();

	return (
		<div className="page-container dark-background">
			<ProfileHero />
            <div className="page-padding">
				<ConfigureAccount />
				<AddListing />
                <MyListings userId={user.id} header={"Your Listings"}/>
            </div>
		</div>
	);
}
