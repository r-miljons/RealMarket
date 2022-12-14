import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorContext } from '../../hooks/useErrorContext';
import { renderDefaultImage } from '../../utils/renderDefaultImage';
import "./RecentlyListed.scss";

export default function RecentlyListed() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const {dispatch} = useErrorContext();
  const navigate = useNavigate();

  useEffect(() => {

    async function getRecentlyListed() {
      setLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/listings?sort=createdAt+descending&limit=1")
        const data = await response.json();
        setListing(data.data[0]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        dispatch({type: "SET_ERROR", payload: err.message})
      }
    }
    getRecentlyListed();
  }, [dispatch])

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
