import React from 'react';
import heroImage from "../../assets/profile-hero.svg";
import { useAuthContext } from '../../hooks/useAuthContext';
import "./Hero.scss";

export default function ProfileHero() {
    const { user } = useAuthContext();

  return (
    <section id='page-hero'>
        <div className='content-wrapper'>
            <div className='hero-left'>
                <div className='hero-text'>
                    <h1>Welcome, {user.username}</h1>
                    <p>Manage your account, add a listing and edit existing ones.</p>
                </div>
                <div className='hero-buttons'>
                    <button className='gradient-btn' onClick={() => {}}>Add a listing</button>
                </div>
            </div>

            <div className='hero-image-container'>
                <img src={heroImage} alt="hero"/>
            </div>
        </div>
    </section>
  )
}
