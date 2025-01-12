import React, { useState } from "react";
import "./MultiSelectDropdown.css";
import { toast } from "react-hot-toast";

const MultiSelectDropdown = ({ options = [], placeholder }) => {
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleOptionClick = (option) => {
		setSelectedOptions(
			(prev) =>
				prev.includes(option)
					? prev.filter((selected) => selected !== option) // Remove if already selected
					: [...prev, option], // Add if not selected
		);
	};

	const toggleDropdown = () => {
		if (options.length === 0) {
			toast.error("No options available");
			return;
		}
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="multi-select-dropdown">
			<div className="dropdown-field" onClick={toggleDropdown}>
				{selectedOptions.length > 0
					? selectedOptions.join(", ")
					: placeholder}
			</div>
			{isDropdownOpen && options.length > 0 && (
				<ul className="dropdown-options">
					{options.map((option) => (
						<li
							key={option}
							className={`dropdown-option ${
								selectedOptions.includes(option)
									? "selected"
									: ""
							}`}
							onClick={() => handleOptionClick(option)}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MultiSelectDropdown;
