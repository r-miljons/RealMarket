import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useErrorContext } from '../../hooks/useErrorContext';
import { renderDefaultImage } from '../../utils/renderDefaultImage';
import "./MostPopular.scss"

export default function MostPopular() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const {dispatch} = useErrorContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getMostPopular() {
      setLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/listings?sort=views+descending&limit=3");
        const data = await response.json();
        setListings(data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        dispatch({type: "SET_ERROR", payload: err.message})
      }
    }
    getMostPopular();
  }, [dispatch])

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

  function renderLoadingPlaceholder() {

    return [...Array(3).keys()].map(item => (
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

  return (
    <section className='item-section'>
      <h2>Most Popular</h2>
      <div className='most-popular-container'>
        { listings && !loading ? renderListings() : renderLoadingPlaceholder() }
        <div id='background-blur'>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  )
}
