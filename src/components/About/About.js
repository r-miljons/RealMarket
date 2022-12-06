import React from "react";
import "./About.scss";
import selectionImg from "../../assets/selection.svg";
import shippingImg from "../../assets/shipping.svg";
import tradeImg from "../../assets/trade.svg";

export default function About() {
	return (
		<section id="about">
			<div className="content-container">
				<div className="section">
					<img src={selectionImg} alt="woman selecting a product" />
					<h3>Expansive Catalog</h3>
					<p>
						Find what you're looking with ease or explore countless product
						categories.
					</p>
				</div>
				<div className="section">
					<img src={tradeImg} alt="two men making a deal" />
					<h3>Become a Seller</h3>
					<p>
						Start selling your products within a few minutes of signing up,
						without fees!
					</p>
				</div>
				<div className="section">
					<img src={shippingImg} alt="woman carrying a package" />
					<h3>Enterprise Solutions</h3>
					<p>
						A platform that you can rely on for you business, with great
						support.
					</p>
				</div>
			</div>
		</section>
	);
}
