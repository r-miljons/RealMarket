import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import twitch from "../../assets/twitch.svg";
import twitter from "../../assets/twitter.svg";
import facebook from "../../assets/facebook.svg";
import "./Footer.scss";

export default function Footer() {
	return (
		<footer id="site-footer">
			<div className="footer-nav-container">
				<img src={logo} alt="logo" id="footer-logo"/>
				<nav>
					<div>
						<p>Support</p>
						<ul>
							<li>
								<Link to="#">Help Center</Link>
							</li>
							<li>
								<Link to="#">Customer Service</Link>
							</li>
						</ul>
					</div>
					<div>
						<p>Community</p>
						<ul>
							<li>
								<Link to="#">Discord</Link>
							</li>
						</ul>
					</div>
					<div>
						<p>Follow Us</p>
						<ul className="socials-list">
							<li>
								<img src={twitch} alt="twitch" />
							</li>
							<li>
								<img src={facebook} alt="facebook" />
							</li>
							<li>
								<img src={twitter} alt="twitter" />
							</li>
						</ul>
					</div>
				</nav>
			</div>
            <hr/>
            <p className="copyright-text">© 2018-2023 RealMarket All rights reserved.</p>
		</footer>
	);
}
