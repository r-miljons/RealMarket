import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import ClickOutsideWrapper from "../../utils/ClickOutsideWrapper";
import Login from "../AuthModule/Login";
import Signup from "../AuthModule/Signup";
import "./Header.scss";

export default function Header() {
	const [loginOpen, setLoginOpen] = useState(false);
	const [signupOpen, setSignupOpen] = useState(false);
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const { logout } = useLogout();

    function renderNavigation() {
        return (
            <div className="nav-container">
				<div className="logo-container" onClick={() => navigate("/")}>
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

	function renderProfile() {
		return (
			<div className="authenticate-container">
				<button className="logout" onClick={handleLogout}>Logout</button>
				<button className="profile-container" onClick={() => navigate("/profile")}>
					<p>{user.username}</p>
					<span className="material-symbols-outlined">account_circle</span>
				</button>
			</div>
		);
	}

	function handleLogout() {
		logout();
	}

	return (
		<>
			<header id="site-header">
				{renderNavigation()}
            	{user ? renderProfile() : renderAuthentication()}
			</header>
			{loginOpen && !user && <ClickOutsideWrapper setIsOpen={setLoginOpen}><Login setLoginOpen={setLoginOpen}/></ClickOutsideWrapper>}
			{signupOpen && !user && <ClickOutsideWrapper setIsOpen={setSignupOpen}><Signup setSignupOpen={setSignupOpen}/></ClickOutsideWrapper>}
		</>
	);
}
