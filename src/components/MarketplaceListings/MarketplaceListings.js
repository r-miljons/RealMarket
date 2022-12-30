import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "../../hooks/useErrorContext";
import { renderDefaultImage } from "../../utils/renderDefaultImage";
import "./MarketplaceListings.scss";
import SearchMarketplace from "./SearchMarketplace";
import SortOptions from "./SortOptions";

export default function MarketplaceListings() {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(false);
	const [sortQuery, setSortQuery] = useState("sort=createdAt+descending");
	const [searchString, setSearchString] = useState("")
	const { dispatch } = useErrorContext();
	const navigate = useNavigate();

	useEffect(() => {
		async function getListings() {
		  setLoading(true);
		  try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/listings?${sortQuery}&search=${encodeURIComponent(searchString)}`);
			const data = await response.json();
			setListings(data.data);
			setLoading(false);
		  } catch (err) {
			setLoading(false);
			dispatch({type: "SET_ERROR", payload: err.message})
		  }
		}
		getListings();
	  }, [dispatch, sortQuery, searchString])

	  function renderLoadingPlaceholder() {

		return [...Array(6).keys()].map(item => (
		  <div className='medium-item-card-loading' key={item}>
			<div className='picture'></div>
			<div className='product-details'>
			<div className="h3"></div>
			  <p></p>
			  <div></div>
			</div>
		  </div>
		  )
		)
	  }

	  function renderListings() {
	
		return listings.map((listing) => (
		  <div className='medium-item-card' key={listing._id} onClick={() => navigate("/listing/" + listing._id)}>
			<img src={listing.pictures[0]?.url || process.env.REACT_APP_PLACEHOLDER_IMG } 
			  alt="product" 
			  onError={renderDefaultImage}/>
			  <div className='product-details'>
				<h3>{listing.title}</h3>
				<p>{listing.location}</p>
				<div>{listing.price} €</div>
			  </div>
		  </div>
		))
	  }

	return (<div className="marketplace-listings-container">
		<div className="actions-container">
			<SearchMarketplace searchString={searchString} setSearchString={setSearchString}/>
			<SortOptions setSortQuery={setSortQuery} sortQuery={sortQuery}/>
		</div>
		{searchString && <p className="search-text">Search results for "{searchString}"</p>}
		<div className='listings-wrapper'>
        { listings && !loading ? renderListings() : renderLoadingPlaceholder() }
      </div>
	</div>);
}
