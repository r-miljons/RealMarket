import React from "react";
import About from "../components/About/About";
import Hero from "../components/Hero/Hero";
import MarketplaceFP from "../components/MarketplaceFP/MarketplaceFP";
import MostPopular from "../components/MostPopular/MostPopular";
import RecentlyListed from "../components/RecentlyListed/RecentlyListed";
import "../index.scss";

export default function Home() {
	return (
		<div className="page-container">
			<Hero />
			<RecentlyListed />
			<MostPopular />
			<MarketplaceFP />
			<About />
		</div>
	);
}
