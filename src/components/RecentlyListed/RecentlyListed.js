import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RecentlyListed.scss";

export default function RecentlyListed() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    async function getRecentlyListed() {
      setLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/listings?sort=createdAt+descending&limit=1")
        const data = await response.json();
        setListing(data.data[0]);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        setError(err.message || err);
      }
    }
    getRecentlyListed();
  }, [])

  function renderListing() {
    return (
      <div className='large-item-card'>
        <img src={listing.pictures[0]?.url || process.env.REACT_APP_PLACEHOLDER_IMG} 
          alt="product" 
          onError={renderDefaultImage}/>
        <div className='product-details'>
          <div className='top'>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
          </div>
          <div className='bottom'>
            <div className='price-container'>
              <span>{listing.location}</span>
              <p>{listing.price} €</p>
            </div>
            <button className='orange-btn' onClick={() => navigate("/listing/" + listing._id)}>View Listing</button>
          </div>
        </div>
      </div>
    );
  };

  function renderDefaultImage(e) {
    const backupImage = process.env.REACT_APP_PLACEHOLDER_IMG;
		if (e.target.src !== backupImage) {
			e.target.src = backupImage;
		}
  }

  function renderLoadingPlaceholder() {
    return (
      <div className='large-item-card-loading'>
        <div className='picture'></div>
        <div className='product-details'>
          <div className='top'>
            <div className='title'></div>
            <div className='description'></div>
          </div>
          <div className='bottom'>
            <div className='price'></div>
          </div>
        </div>
      </div>
    ); 
  }

  return (
    <section className='item-section'>
      <h2>Recently Listed</h2>
      {
        listing && !loading ? renderListing() : renderLoadingPlaceholder()
      }
    </section>
  )
}
