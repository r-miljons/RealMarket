import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useErrorContext } from '../../hooks/useErrorContext';
import { renderDefaultImage } from '../../utils/renderDefaultImage';
import "./MarketplaceFP.scss"

export default function MarketplaceFP() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useErrorContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getListings() {
      setLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/listings?limit=16");
        const data = await response.json();
        setListings(data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        dispatch({type: "SET_ERROR", payload: err.message})
      }
    }
    getListings();
  }, [dispatch])

  function renderMarketplaceListings() {
    

    return listings.map((listing) => (
      <div className='small-item-card' key={listing._id} onClick={() => navigate("/listing/" + listing._id)}>
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

  function renderLoadingPlaceholder() {

    return [...Array(4).keys()].map(item => (
      <div className='small-item-card-loading' key={item}>
        <div className='picture'></div>
        <div className='product-details'>
          <div className='h3'></div>
          <p></p>
          <div></div>
        </div>
      </div>
      )
    )
  }

  return (
    <section className='item-section'>
      <div className='space-between'>
        <h2>Marketplace</h2>
        <button className='marketplace-btn btn-margin' onClick={() => navigate("/marketplace")}>More</button>
      </div>
      <div className='marketplace-container'>
        { listings && !loading ? renderMarketplaceListings() : renderLoadingPlaceholder() }
      </div>
    </section>
  )
}
