import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import heroImage from "../../assets/user-hero.svg";
import { useErrorContext } from '../../hooks/useErrorContext';
import mailIcon from "../../assets/mail.svg";
import phoneIcon from "../../assets/phone-call.svg";
import format from "date-fns/format";

export default function UserHero() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useErrorContext();

    const username = id.split("-")[0];
    const userId = id.split("-")[1];

    useEffect(() => {
        async function getListingsData() {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/listings?user=${userId}`);
            const data = await response.json();
            return data.data;
        }
        
        async function getUserData() {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${userId}`);
            const data = await response.json();
            return data.data;
        }

        async function getData() {
          setLoading(true);
          try {
              const userData = await getUserData();
              const listingsData = await getListingsData();
              setUser(userData);
              setListings(listingsData);
          } catch (err) {
              setLoading(false);
              dispatch({type: "SET_ERROR", payload: err.message})
          }
        }

        getData();
          
    }, [dispatch])

    function log() {
        console.log(user, listings)
    }

    function calculateListingViews(listings) {
        let total = 0;
        listings.forEach(e => {
            total += e.views;
        });
        return total;
    }

  return (
    <section id='page-hero'>
        <div className='content-wrapper'>
            <div className='hero-left-dark'>
                <div className='hero-text'>
                    <h1>{username}</h1>
                    {user && <div className="seller-info">
						{user.email && <div>
							<img src={mailIcon} alt="icon" />
							<p>{user.email}</p>
						</div>}
						{user.phone && <div>
							<img src={phoneIcon} alt="icon" />
							<p>{user.phone}</p>
						</div>}
                        <p>Joined: {format(new Date(user.createdAt), "PPP")}</p>
                        {listings && <>
                            <p>Active listings: {listings.length}</p>
                            <p>Listing views: {calculateListingViews(listings)}</p>
                        </>
                        }
					</div>}
                </div>
            </div>

            <div className='hero-image-container'>
                <img src={heroImage} alt="hero"/>
            </div>
        </div>
    </section>
  )
}
