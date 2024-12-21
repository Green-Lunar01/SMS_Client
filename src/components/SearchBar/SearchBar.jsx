import React from "react";
import "./SearchBar.css";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ searchQuery, setSearchQuery, handleClick }) => (
	<div className="search-component-area ">
		<div>
			<span className="search-bar">
				<CiSearch />
				<input
					type="text"
					placeholder="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</span>
			<button onClick={handleClick}>Search</button>
		</div>
	</div>
);

export default SearchBar;
