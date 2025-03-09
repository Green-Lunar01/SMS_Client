import React, { useState, useContext, useEffect } from "react";
import "./Assignment.css";
import personImg from "../../../assets/person-img.png";
import calendarImg from "../../../assets/calendar-img.png";
import bookImg from "../../../assets/book-img.png";
import teachImg from "../../../assets/teach-img.png";
import { LiaCommentDots } from "react-icons/lia";
import Modal from "../../../components/Modal/Modal";
import { RiCloseLine } from "react-icons/ri";
import { UserContext } from "../../../context/userContext";
import { SchoolContext } from "../../../context/schoolContext";
import api from "../../../lib/axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";

const Assignment = () => {
	const [assignments, setAssignments] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { user } = useContext(UserContext);
	const { subjects, classes, employees } = useContext(SchoolContext);

	const [teacherList, setTeacherList] = useState([]);
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedTeacher, setSelectedTeacher] = useState("");
	const [date, setDate] = useState("");
	const [details, setDetails] = useState("");
	const [creating, setCreating] = useState(false);

	const [filterDate, setFilterDate] = useState("");
	const [filterClass, setFilterClass] = useState("");
	const [filterTeacher, setFilterTeacher] = useState("");
	const [loading, setLoading] = useState(false);

	const getEmployeeByCategory = (category) => {
		setTeacherList(
			employees.filter((employee) => employee.role === category),
		);
	};

	useEffect(() => {
		getEmployeeByCategory("Teacher");
	}, [employees]);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const [isModal2Open, setIsModal2Open] = useState(false);

	const openModal2 = () => {
		setIsModal2Open(true);
	};
	const closeModal2 = () => {
		setIsModal2Open(false);
	};

	const createAssignment = async () => {
		if (
			!selectedClass ||
			!selectedSubject ||
			!date ||
			!selectedTeacher ||
			!details
		) {
			toast.error("All fields are required");
			return;
		}

		setCreating(true);

		try {
			const response = await api.post(
				"/school/assignments/create",
				{
					teacher_id: Number(selectedTeacher),
					subject_id: Number(selectedSubject),
					class_id: Number(selectedClass),
					details,
					date,
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);
			// console.log(response);
			toast.success("Assignment created successfully");
			setCreating(false);
			setIsModalOpen(false);
			fetchAssignments();
		} catch (err) {
			console.log(err);
			toast.error(
				err.response.data.message ||
					err.message ||
					"Error creating assignment",
			);
			setCreating(false);
		}
	};

	const fetchAssignments = async () => {
		setLoading(true);
		try {
			const response = await api.get(
				`/school/assignments?date=${filterDate}&class_id=${filterClass}&teacher_id=${filterTeacher}`,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);
			console.log(response);
			if (response.data.assignments.length === 0) {
				toast.error(
					"No assignments found for the selected combination",
				);
			}
			setAssignments(response.data.assignments);
		} catch (err) {
			console.log(err);
			if (
				err.response.data.message ===
				'Server Error: invalid input syntax for type date: ""'
			) {
				toast.error("No assignments found for the selected date");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!filterDate || !filterClass || !filterTeacher) return;
		fetchAssignments();
	}, [filterDate, filterClass, filterTeacher]);

	return (
		<div className="assignment-screen">
			<h2>Assignment</h2>
			<aside>
				<article>
					<div>
						<label htmlFor="date">Homework Date *</label>
						<input
							type="date"
							name="date"
							id="date"
							value={filterDate}
							onChange={(e) => setFilterDate(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="class">Class *</label>
						<select
							name="class"
							id="class"
							value={filterClass}
							onChange={(e) => setFilterClass(e.target.value)}
						>
							<option value="">Select Class</option>
							{classes.map((classItem) => (
								<option key={classItem.id} value={classItem.id}>
									{classItem.class_name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="teacher">Teacher *</label>
						<select
							name="teacher"
							id="teacher"
							value={filterTeacher}
							onChange={(e) => setFilterTeacher(e.target.value)}
						>
							<option value="">Select Teacher</option>
							{teacherList.map((teacher) => (
								<option key={teacher.id} value={teacher.id}>
									{teacher.first_name} {teacher.last_name}
								</option>
							))}
						</select>
					</div>
					{/* <button className="primary-btn">Search</button> */}
					<button onClick={() => setIsModalOpen(true)}>
						Add Assignment
					</button>
				</article>
			</aside>

			{loading ? (
				<Spinner />
			) : (
				<main>
					<article>
						<div className="top">
							<div style={{ backgroundColor: "#F3FEF7" }}>
								<img src={personImg} alt="" />
								<span>
									<h6>Robert</h6>
									<p>Teacher</p>
								</span>
							</div>
							<div style={{ backgroundColor: "#E9EFFF" }}>
								<img src={bookImg} alt="" />
								<span>
									<h6>English Language</h6>
									<p>Subject</p>
								</span>
							</div>
							<div style={{ backgroundColor: "#FFF5EF" }}>
								<img src={teachImg} alt="" />
								<span>
									<h6>J.S.S.1</h6>
									<p>Class</p>
								</span>
							</div>
							<div style={{ backgroundColor: "#E6E6E6" }}>
								<img src={calendarImg} alt="" />
								<span>
									<h6>21</h6>
									<p>month year</p>
								</span>
							</div>

							<span onClick={() => setIsModal2Open(true)}>
								<LiaCommentDots />
								<p>Add Comments</p>
							</span>
						</div>
						<div className="bottom">
							<h4>Assignment</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Nesciunt, nobis aut?
								Inventore, consequatur ullam, aut obcaecati
								quas, cum esse molestiae debitis dolor beatae
								eius rem. Quod dolor voluptatum magni nulla!
								Commodi, sint natus. Eos mollitia quasi quidem,
								eaque ad eius labore repellendus vel! Omnis
								magni accusantium eaque velit consectetur rerum,
								esse, sunt fugiat animi deserunt necessitatibus
								provident sapiente mollitia accusamus.
							</p>
						</div>
					</article>
					<article>
						<div className="top">
							<div style={{ backgroundColor: "#F3FEF7" }}>
								<img src={personImg} alt="" />
								<span>
									<h6>Robert</h6>
									<p>Teacher</p>
								</span>
							</div>
							<div style={{ backgroundColor: "#E9EFFF" }}>
								<img src={bookImg} alt="" />
								<span>
									<h6>English Language</h6>
									<p>Subject</p>
								</span>
							</div>
							<div style={{ backgroundColor: "#FFF5EF" }}>
								<img src={teachImg} alt="" />
								<span>
									<h6>J.S.S.1</h6>
									<p>Class</p>
								</span>
							</div>
							<div style={{ backgroundColor: "#E6E6E6" }}>
								<img src={calendarImg} alt="" />
								<span>
									<h6>21</h6>
									<p>month year</p>
								</span>
							</div>

							<span onClick={() => setIsModal2Open(true)}>
								<LiaCommentDots />
								<p>Add Comments</p>
							</span>
						</div>
						<div className="bottom">
							<h4>Assignment</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Nesciunt, nobis aut?
								Inventore, consequatur ullam, aut obcaecati
								quas, cum esse molestiae debitis dolor beatae
								eius rem. Quod dolor voluptatum magni nulla!
								Commodi, sint natus. Eos mollitia quasi quidem,
								eaque ad eius labore repellendus vel! Omnis
								magni accusantium eaque velit consectetur rerum,
								esse, sunt fugiat animi deserunt necessitatibus
								provident sapiente mollitia accusamus.
							</p>
						</div>
					</article>
				</main>
			)}

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div className="add-assignment-modal">
					<aside>
						<h3>Add Assignment</h3>
						<RiCloseLine onClick={closeModal} />
					</aside>
					<main>
						<article>
							<div className="form-group">
								<label htmlFor="date">Homework Date *</label>
								<input
									type="date"
									name="date"
									id="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="setBy">Set By *</label>
								<select
									name="setBy"
									id="setBy"
									value={selectedTeacher}
									onChange={(e) =>
										setSelectedTeacher(e.target.value)
									}
								>
									<option value="">Select Teacher</option>
									{teacherList.map((teacher) => (
										<option
											key={teacher.id}
											value={teacher.id}
										>
											{teacher.first_name}{" "}
											{teacher.surname}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="class">Class *</label>
								<select
									name="class"
									id="class"
									value={selectedClass}
									onChange={(e) =>
										setSelectedClass(e.target.value)
									}
								>
									<option value="">Select Class</option>
									{classes.map((cls) => (
										<option key={cls.id} value={cls.id}>
											{cls.class_name}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="subject">Subject *</label>
								<select
									name="subject"
									id="subject"
									value={selectedSubject}
									onChange={(e) =>
										setSelectedSubject(e.target.value)
									}
								>
									<option value="">Select Subject</option>
									{subjects.map((sub) => (
										<option key={sub.id} value={sub.id}>
											{sub.subject_name}
										</option>
									))}
								</select>
							</div>
						</article>
						<section>
							<div className="form-group details">
								<label htmlFor="details">Details *</label>
								<textarea
									name="details"
									id="details"
									cols="30"
									rows="10"
									placeholder="Enter assignment details"
									value={details}
									onChange={(e) => setDetails(e.target.value)}
								></textarea>
							</div>

							<button
								className="primary-btn"
								disabled={creating}
								onClick={createAssignment}
							>
								{creating ? "Adding..." : "Add Assignment"}
							</button>
						</section>
					</main>
				</div>
			</Modal>

			<Modal isOpen={isModal2Open} onClose={closeModal2}>
				<div className="add-comment-modal">
					<aside>
						<h3>Add Comment</h3>
						<RiCloseLine onClick={closeModal2} />
					</aside>
					<main></main>
				</div>
			</Modal>
		</div>
	);
};

export default Assignment;
