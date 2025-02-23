import React, { useState, useEffect, useContext } from "react";
import "./AllClasses.css";
import { CiSearch } from "react-icons/ci";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import CircularProgress from "../../../../components/CircularProgress/CircularProgress";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../../context/userContext";

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
	const [allClasses, setAllClasses] = useState([]);
	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
	const { userToken } = useContext(UserContext);

	const getClasses = async () => {
		try {
			const response = await axios.get(
				`${BASE_API_URL}/school/classes/full-details`,
				{
					headers: { Authorization: `${userToken}` },
				},
			);
			// console.log(response.data.data);
			setAllClasses(response.data.data);
		} catch (err) {
			// toast.error(err.response.data.message || err.message);
			console.log(err);
		}
	};

	useEffect(() => {
		getClasses();
	}, []);

	const filteredClasses = allClasses.filter((classData) =>
		classData.class_name.toLowerCase().includes(searchQuery.toLowerCase()),
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
	const {
		class_name,
		totalStudents,
		female_students,
		male_students,
		class_teacher,
		subject,
		id,
	} = data;

	return (
		<div className="class-card">
			<h3>{class_name}</h3>
			<main>
				<div className="stats">
					<div className="stat">
						<h2>
							{Number(female_students) + Number(male_students)}
						</h2>
						<p>Students</p>
					</div>
					<CircularProgress
						label="Female"
						value={female_students}
						percentage={
							typeof male_students === "undefined" ||
							typeof female_students === "undefined" ||
							Number(male_students) + Number(female_students) ===
								0
								? 0
								: Math.round(
										(Number(female_students) /
											(Number(male_students) +
												Number(female_students))) *
											10000,
									) / 100
						}
						rotation={-230}
						bgColor="#e6e6e6"
						color="#DC44FB"
					/>
					<CircularProgress
						label="Male"
						value={male_students}
						percentage={
							typeof male_students === "undefined" ||
							typeof female_students === "undefined" ||
							Number(male_students) + Number(female_students) ===
								0
								? 0
								: Math.round(
										(Number(male_students) /
											(Number(male_students) +
												Number(female_students))) *
											10000,
									) / 100
						}
						rotation={-230}
						bgColor="#e6e6e6"
						color="#7FB2F3"
					/>
					<CircularProgress
						label="Class Teacher"
						value={class_teacher}
						percentage={80}
						text={"subject"}
						rotation={-230}
						bgColor="#e6e6e6"
						color="#13A541"
					/>
				</div>
				<div className="actions">
					<Link to={`/school/dashboard/classdetails/${id}`}>
						View class
					</Link>
					<Link
						to={`/school/dashboard/editclass/${id}`}
						className="edit"
					>
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
