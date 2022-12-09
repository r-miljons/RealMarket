import React, { useEffect, useState } from "react";
import "./MyListings.scss";
import emptyDocuments from "../../assets/empty-documents.svg";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function MyListings() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        async function getMyListings() {
          setLoading(true);
          try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/listings?user=${user.id}`);
            const data = await response.json();
            setListings(data.data);
            setLoading(false);
            setError(false);
          } catch (err) {
            setLoading(false);
            setError(err.message || err);
          }
        }
        getMyListings();
    }, [])

    function renderListings() {

        const renderDefaultImage = (e) => {
            const backupImage = process.env.REACT_APP_PLACEHOLDER_IMG;
            if (e.target.src !== backupImage) {
              e.target.src = backupImage;
            } 
          }

        if (listings && listings.length === 0) {
            return renderEmptyListings();
        };

        return listings.map((listing) => (
            <div className='medium-item-card' key={listing._id}>
              <img src={listing.pictures[0] || process.env.REACT_APP_PLACEHOLDER_IMG } 
                alt="product" 
                onError={renderDefaultImage}/>
                <div className='product-details'>
                  <h3>{listing.title}</h3>
                  <p>{listing.location}</p>
                  <div>{listing.price} €</div>
                </div>
            </div>
          ));
    }
    
    function renderLoadingPlaceholder() {
        return [...Array(4).keys()].map(item => (
          <div className='medium-item-card-loading' key={item}>
            <div className='picture'></div>
            <div className='product-details'>
              <h3></h3>
              <p></p>
              <div></div>
            </div>
          </div>
          )
        )
      }

    function renderEmptyListings() {
        return (
            <div className="large-card">
                <div className="card-text">
                    <h3>No listings to show</h3>
                    <p>Start by adding one.</p>
                    <button className="gradient-btn">Add a listing</button>
                </div>
                <img src={emptyDocuments} alt="empty documents" />
            </div>
        );
    }

	return (
		<div className="item-section">
			<h2>Your Listings</h2>
            {listings && !loading ? (
                <div className="listings-container">
                    {renderListings()}
                </div>
            ) : (
                <div className="listings-container">
                    {renderLoadingPlaceholder()}
                </div>
            )}
		</div>
	);
}
