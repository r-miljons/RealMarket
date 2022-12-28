import React from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function MarketplaceListings() {
	function renderActions() {
		return (
			<div className="actions-container">
				<div className="search-wrapper">
					<input type="text" />
					<button className="search">
						<span className="material-symbols-outlined">search</span>
					</button>
				</div>
				<div className="sort-container">

				</div>
			</div>
		);
	}

	return <div className="marketplace-container">{renderActions()}
	
	</div>;
}
