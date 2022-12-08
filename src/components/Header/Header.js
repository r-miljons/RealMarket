import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import Login from "../AuthModule/Login";
import Signup from "../AuthModule/Signup";
import "./Header.scss";

export default function Header() {
	const [loginOpen, setLoginOpen] = useState(false);
	const [signupOpen, setSignupOpen] = useState(false);

    function renderNavigation() {
        return (
            <div className="nav-container">
				<div className="logo-container">
					<img src={logo} alt="logo" />
				</div>
				<nav>
					<ul>
						<NavLink to="/">
							<li>Home</li>
						</NavLink>
						<NavLink to="/marketplace">
							<li>Marketplace</li>
						</NavLink>
						<NavLink to="/community">
							<li>Community</li>
						</NavLink>
					</ul>
				</nav>
			</div>
        );
    }

	function renderAuthentication() {
		return (
			<div className="authenticate-container">
                	<Link onClick={() => {
						if (signupOpen) {
							setSignupOpen(false);
						}
						setLoginOpen(!loginOpen)
					}}>Login</Link>
                	<button className="gradient-btn" onClick={() => {
						if (loginOpen) {
							setLoginOpen(false);
						}
						setSignupOpen(!signupOpen)
					}}>Sign Up</button>
            </div>
		);
	}

	return (
		<>
			<header id="site-header">
				{renderNavigation()}
            	{renderAuthentication()}
			</header>
			{loginOpen && <Login />}
			{signupOpen && <Signup />}
		</>
	);
}
