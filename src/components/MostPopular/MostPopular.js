import React, { useEffect, useState } from 'react'
import "./MostPopular.scss"

export default function MostPopular() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMostPopular() {
      setLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/listings?sort=views+descending&limit=3");
        const data = await response.json();
        setListings(data.data);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        setError(err.message || err);
      }
    }
    getMostPopular();
  }, [])

  function renderMostPopularListings() {
    
    const renderDefaultImage = (e) => {
      const backupImage = process.env.REACT_APP_PLACEHOLDER_IMG;
      if (e.target.src !== backupImage) {
        e.target.src = backupImage;
      } 
    }

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
    ))
  }

  function renderLoadingPlaceholder() {

    return [...Array(3).keys()].map(item => (
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

  return (
    <section className='item-section'>
      <h2>Most Popular</h2>
      <div className='most-popular-container'>
        { listings && !loading ? renderMostPopularListings() : renderLoadingPlaceholder() }
        <div id='background-blur'>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  )
}
