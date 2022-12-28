import React from 'react'
import heroImage from "../../assets/hero-image.svg"
import { useNavigate } from "react-router-dom"
import "./Hero.scss"

export default function PageHero() {
    const navigate = useNavigate();

  return (
    <section id="page-hero">
        <div className='content-wrapper'>
            <div className='hero-left'>
                <div className='hero-text'>
                    <h1>Explore products from all over the world</h1>
                    <p>Participate in the global economy of goods and services</p>
                </div>
                <div className='hero-buttons'>
                    <button className='gradient-btn' onClick={() => navigate("/marketplace")}>Explore</button>
                    <button className="dark-orange-btn" onClick={() => navigate("/community")}>Community</button>
                </div>
            </div>

            <div className='hero-image-container'>
                <img src={heroImage} alt="hero"/>
            </div>
        </div>
    </section>
  )
}
