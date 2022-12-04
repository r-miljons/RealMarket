import React, { useEffect, useState } from 'react';
import "./RecentlyListed.scss";

export default function RecentlyListed() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        <img src={listing.pictures[0]} alt="product" onError={renderDefaultImage}/>
        <div className='product-details'>
          <div className='top'>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
          </div>
          <div className='bottom'>
            <div className='price-container'>
              <span>Price</span>
              <p>{listing.price} €</p>
            </div>
            <button className='orange-btn'>View Listing</button>
          </div>
        </div>
      </div>
    );
  };

  function renderDefaultImage(e) {
    const backupImage = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081";
		if (e.target.src !== backupImage) {
			e.target.src = backupImage;
		}
    console.log("?");
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
