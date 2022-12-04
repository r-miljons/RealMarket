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
    

    return listings.map((listing) => (
      <div className='medium-item-card' key={listing._id}>
        <img src={listing.pictures[0] || "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081" } 
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
    return <div>Loading</div>
  }

  function renderDefaultImage(e) {
    const backupImage = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081";
		if (e.target.src !== backupImage) {
			e.target.src = backupImage;
		} 
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
