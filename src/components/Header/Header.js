import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import "./Header.scss";

export default function Header() {
    const navigate = useNavigate();

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

	return (
		<header>
			{renderNavigation()}
            <div className="authenticate-container">
                <Link to="/login">Login</Link>
                <button className="gradient-btn" onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
		</header>
	);
}
