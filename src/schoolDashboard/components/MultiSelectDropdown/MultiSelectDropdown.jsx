import React, { useState } from "react";
import "./MultiSelectDropdown.css";
import { toast } from "react-hot-toast";

const MultiSelectDropdown = ({
	options = [],
	placeholder,
	selectedOptions,
	setSelectedOptions,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedOptionsNames, setSelectedOptionsNames] = useState([]);

	const handleOptionClick = (option) => {
		setSelectedOptions(
			(prev) =>
				prev.includes(option.id)
					? prev.filter((selected) => selected !== option.id) // Remove if already selected
					: [...prev, option.id], // Add if not selected
		);

		setSelectedOptionsNames((prev) =>
			prev.includes(option.class_name)
				? prev.filter((selected) => selected !== option.class_name)
				: [...prev, option.class_name],
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
					? selectedOptionsNames.join(", ")
					: placeholder}
			</div>
			{isDropdownOpen && options.length > 0 && (
				<ul className="dropdown-options">
					{options.map((option) => (
						<li
							key={option.id}
							className={`dropdown-option ${
								selectedOptions.includes(option.id)
									? "selected"
									: ""
							}`}
							onClick={() => handleOptionClick(option)}
						>
							{option.class_name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MultiSelectDropdown;
