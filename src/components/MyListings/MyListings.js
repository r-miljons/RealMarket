import React, { useEffect, useState } from "react";
import "./MyListings.scss";
import emptyDocuments from "../../assets/empty-documents.svg";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "../../hooks/useErrorContext";
import { renderDefaultImage } from "../../utils/renderDefaultImage";

export default function MyListings({userId, header}) {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useErrorContext();
    const navigate = useNavigate()

    useEffect(() => {
        async function getMyListings() {
          setLoading(true);
          try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/listings?user=${userId}`);
            const data = await response.json();
            setListings(data.data);
            setLoading(false);
          } catch (err) {
            setLoading(false);
            dispatch({type: "SET_ERROR", payload: err.message})
          }
        }
        getMyListings();
    }, [dispatch, userId])

    function renderListings() {

        if (listings && listings.length === 0) {
            return renderEmptyListings();
        };

        return (<div className="listings-container">{listings.map((listing) => (
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
          ))}
          </div>
        )
    }
    
    function renderLoadingPlaceholder() {
        return (<div className="listings-container">{[...Array(4).keys()].map(item => (
          <div className='medium-item-card-loading' key={item}>
            <div className='picture'></div>
            <div className='product-details'>
              <div className="h3"></div>
              <p></p>
              <div></div>
            </div>
          </div>
          )
        )}
        </div>
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
			<h2>{header}</h2>
            {listings && !loading ? renderListings() : renderLoadingPlaceholder()}
		</div>
	);
}
