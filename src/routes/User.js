import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useErrorContext } from "../hooks/useErrorContext";
import UserHero from "../components/Hero/UserHero";
import MyListings from "../components/MyListings/MyListings";

export default function User() {
    const [listings, setListings] = useState();
	const [loading, setLoading] = useState(true);
	const { dispatch } = useErrorContext();
	const { id } = useParams();
	const navigate = useNavigate();

	return (
		<div className="page-container dark-background">
			<UserHero />
			<div className="page-padding">
				<MyListings header={"Listings by " + id.split("-")[0]} userId={id.split("-")[1]}/>
			</div>
		</div>
	);
}
