import React, { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "./SortOptions.scss";

export default function SortOptions({ setSortQuery }) {
    const options = [
        "Newest",
        "Oldest",
        "Most Expensive",
        "Least Expensive",
        "Most Popular",
        "Least Popular"
    ];

    function handleChange(e) {
        switch (e.value) {
            case "Newest": setSortQuery("sort=createdAt+descending"); break;
            case "Oldest": setSortQuery("sort=createdAt+ascending"); break;
            case "Most Expensive": setSortQuery("sort=price+descending"); break;
            case "Most Popular": setSortQuery("sort=views+descending"); break;
            case "Least Expensive": setSortQuery("sort=price+ascending"); break;
            case "Least Popular": setSortQuery("sort=views+ascending"); break;
            default: setSortQuery("sort=createdAt+descending");
        }
    }

	return (
		<div className="sort-container">
            <div className="dropdown-wrapper">
                <Dropdown options={options} onChange={handleChange} value={options[0]} placeholder="Sort by" />
            </div>
			
		</div>
	);
}
