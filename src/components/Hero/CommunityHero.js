import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from "../../assets/community-hero.svg";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useErrorContext } from '../../hooks/useErrorContext';
import "./Hero.scss";

export default function CommunityHero() {
	const navigate = useNavigate();
	const { user } = useAuthContext();
    const { dispatch } = useErrorContext();


    function handleAddListing() {
		if (user) {
			navigate("/profile#add-listing");
		} else {
            dispatch({type: "SET_ERROR", payload: "Login to add a listing"});
        }
	}

  return (
    <section id='page-hero'>
        <div className='content-wrapper'>
        <div className="hero-left">
					<div className="hero-text">
						<h1>Community</h1>
						<p>
                            Find RealMarket users and their listings.
						</p>
					</div>
					<div className="hero-buttons">
						<button className="gradient-btn" onClick={handleAddListing}>
							Add a listing
						</button>
					</div>
				</div>

				<div className="hero-image-container">
					<img src={heroImage} alt="hero" />
				</div>
        </div>
    </section>
  )
}
