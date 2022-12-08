import React from "react";
import About from "../components/About/About";
import PageHero from "../components/Hero/PageHero";
import MarketplaceFP from "../components/MarketplaceFP/MarketplaceFP";
import MostPopular from "../components/MostPopular/MostPopular";
import RecentlyListed from "../components/RecentlyListed/RecentlyListed";
import "../index.scss";

export default function Home() {
	return (
		<div className="page-container dark-background">
			<PageHero />
			<div className="page-padding">
				<RecentlyListed />
				<MostPopular />
				<MarketplaceFP />
			</div>
			<About />
		</div>
	);
}
