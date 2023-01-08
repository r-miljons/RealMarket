import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CommunityHero from '../components/Hero/CommunityHero'
import SearchMarketplace from '../components/MarketplaceListings/SearchMarketplace'
import UserListingsPreview from '../components/UserListings/UserListingsPreview';
import { useErrorContext } from '../hooks/useErrorContext';
import "./Community.scss";

export default function Community() {
  const [searchString, setSearchString] = useState("");
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { dispatch } = useErrorContext();

  useEffect(() => {
    async function getListings() {
		  setLoading(true);
		  try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users?search=${encodeURIComponent(searchString)}`);
			const data = await response.json();
			setUsers(data.data.sort(() => Math.random() - 0.5));
			setLoading(false);
		  } catch (err) {
			setLoading(false);
			dispatch({type: "SET_ERROR", payload: err.message})
		  }
		}
		getListings();
  },[searchString])

  function renderLoadingPlaceholder() {

		return <>
      <div className='loading-users'>
      <div className='h2'></div>
      <div className='listings-wrapper'>
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
    </div>
    <div className='loading-users'>
      <div className='h2'></div>
      <div className='listings-wrapper'>
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
    </div>
    </>
	  }

	  function renderUsers() {
	
		return users.map((user) => (
      <div className='user-container' key={user._id}>
        <div className='name-wrapper'>
          <h2 className='username'>{user.username}</h2>
          <button className='marketplace-btn' onClick={() => navigate(`/user/${user.username}-${user._id}`)}>View</button>
        </div>
        <UserListingsPreview user={user}/>
      </div>
		))
	  }

  return (
    <div className="page-container dark-background">
      <CommunityHero />
      <div className="page-padding">
        <div className="marketplace-listings-container">
          <SearchMarketplace setSearchString={setSearchString} placeholder="Search for users..."/>
          
            { users && !loading ? renderUsers() : renderLoadingPlaceholder() }
          
        </div>
      </div>
    </div>
  )
}
