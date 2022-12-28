import React from "react";
import MarketplaceHero from "../components/Hero/MarketplaceHero";
import MarketplaceListings from "../components/MarketplaceListings/MarketplaceListings";

export default function Marketplace() {

	return (
		<div className="page-container dark-background">
			<MarketplaceHero />
			<div className="page-padding">
        <MarketplaceListings />
      </div>
		</div>
	);
}
