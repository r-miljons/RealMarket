import React, { Component } from "react";
import Slider from "react-slick";
import "../../routes/ListingPage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.scss";

export default class SimpleSlider extends Component {
	renderDefaultImage = (e) => {
		const backupImage = process.env.REACT_APP_PLACEHOLDER_IMG;
		if (e.target.src !== backupImage) {
			e.target.src = backupImage;
		}
	};

	render() {
		const { pictures } = this.props;
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
		return (
			<Slider {...settings}>
				{pictures.map((picture) => (
					<div className="image-wrapper" key={picture.url}>
						<img
							src={picture.url}
							alt="product"
							onError={this.renderDefaultImage}
						/>
					</div>
				))}
			</Slider>
		);
	}
}
