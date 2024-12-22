import React, { useState } from "react";
import "./AllClasses.css";
import { CiSearch } from "react-icons/ci";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import CircularProgress from "../../../../components/CircularProgress/CircularProgress";
import { Link } from "react-router-dom";

const AllClasses = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const classes = [
		{
			id: 1,
			name: "J.S.S 1",
			totalStudents: 50,
			female: 25,
			male: 25,
			teacher: "Paul Mark",
			subject: "Mathematics",
		},
		{
			id: 2,
			name: "J.S.S 2",
			totalStudents: 60,
			female: 10,
			male: 50,
			teacher: "Paul Mark",
			subject: "Fine Art",
		},
	];

	const filteredClasses = classes.filter((classData) =>
		classData.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="all-classes-container">
			<SearchBar
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			<div className="class-list">
				{filteredClasses.length > 0 ? (
					filteredClasses.map((classData, index) => (
						<ClassCard key={index} data={classData} />
					))
				) : (
					<p>No classes found.</p>
				)}
			</div>
		</div>
	);
};

const SearchBar = ({ searchQuery, setSearchQuery }) => (
	<div className="search-area">
		<h4>Search Class</h4>
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
			<button>Search</button>
		</div>
	</div>
);

const ClassCard = ({ data }) => {
	const { name, totalStudents, female, male, teacher, subject, id } = data;

	return (
		<div className="class-card">
			<h3>{name}</h3>
			<main>
				<div className="stats">
					<div className="stat">
						<h2>{totalStudents}</h2>
						<p>Students</p>
					</div>
					<CircularProgress
						label="Female"
						value={female}
						percentage={
							Math.round((female / totalStudents) * 10000) / 100
						}
						rotation={-230}
						bgColor="#e6e6e6"
						color="#DC44FB"
					/>
					<CircularProgress
						label="Male"
						value={male}
						percentage={
							Math.round((male / totalStudents) * 10000) / 100
						}
						rotation={-230}
						bgColor="#e6e6e6"
						color="#7FB2F3"
					/>
					<CircularProgress
						label="Class Teacher"
						value={teacher}
						percentage={80}
						text={subject}
						rotation={-230}
						bgColor="#e6e6e6"
						color="#13A541"
					/>
				</div>
				<div className="actions">
					<Link to={`/dashboard/classdetails/${id}`}>View class</Link>
					<Link to={`/dashboard/editclass/${id}`} className="edit">
						<RiEdit2Line />
					</Link>
					<button className="delete">
						<RiDeleteBin6Line />
					</button>
				</div>
			</main>
		</div>
	);
};

export default AllClasses;
