import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useErrorContext } from '../../hooks/useErrorContext';
import { renderDefaultImage } from '../../utils/renderDefaultImage'

export default function UserListingsPreview({ user }) {
    const [listings, setListings] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { dispatch } = useErrorContext();

    useEffect(() => {
        async function getListings() {
            setLoading(true);
            try {
              const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/listings?user=${user._id}&limit=3&sort=createdAt+descending`);
              const data = await response.json();
              setListings(data.data);
              setLoading(false);
            } catch (err) {
              setLoading(false);
              dispatch({type: "SET_ERROR", payload: err.message})
            }
          }
          getListings();
    },[])

    function renderLoadingPlaceholder() {

		return <div className='listings-wrapper'>
            {
                [...Array(3).keys()].map(item => (
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
        </div>
    }

    function renderListings() {
        
        if (listings.length > 0) {
            return <div className='listings-wrapper'>
            {
                listings.map((listing) => (
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
            </div>
        } else {
            return <div className='user-no-listings'>
                <p>{user.username} has no active listings.</p>
            </div>
        }
		
	  }


  return listings && !loading ? renderListings() : renderLoadingPlaceholder()
}
