import React, { useState } from "react";
import "./Assignment.css";
import personImg from "../../../assets/person-img.png";
import calendarImg from "../../../assets/calendar-img.png";
import bookImg from "../../../assets/book-img.png";
import teachImg from "../../../assets/teach-img.png";
import { LiaCommentDots } from "react-icons/lia";
import Modal from "../../../components/Modal/Modal";
import { RiCloseLine } from "react-icons/ri";

const Assignment = () => {
	const [assignments, setAssignments] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);

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

	return (
		<div className="assignment-screen">
			<h2>Assignment</h2>
			<aside>
				<article>
					<div>
						<label htmlFor="date">Homework Date *</label>
						<input type="date" name="date" id="date" />
					</div>

					<div>
						<label htmlFor="class">Class *</label>
						<select name="class" id="class">
							<option value="JSS2">J.S.S.2</option>
						</select>
					</div>

					<div>
						<label htmlFor="teacher">Teacher *</label>
						<select name="teacher" id="teacher">
							<option value="james">James</option>
							<option value="john">John</option>
						</select>
					</div>
					<button className="primary-btn">Search</button>
					<button onClick={() => setIsModalOpen(true)}>
						Add Assignment
					</button>
				</article>
			</aside>

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
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Nesciunt, nobis aut? Inventore, consequatur
							ullam, aut obcaecati quas, cum esse molestiae
							debitis dolor beatae eius rem. Quod dolor voluptatum
							magni nulla! Commodi, sint natus. Eos mollitia quasi
							quidem, eaque ad eius labore repellendus vel! Omnis
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
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Nesciunt, nobis aut? Inventore, consequatur
							ullam, aut obcaecati quas, cum esse molestiae
							debitis dolor beatae eius rem. Quod dolor voluptatum
							magni nulla! Commodi, sint natus. Eos mollitia quasi
							quidem, eaque ad eius labore repellendus vel! Omnis
							magni accusantium eaque velit consectetur rerum,
							esse, sunt fugiat animi deserunt necessitatibus
							provident sapiente mollitia accusamus.
						</p>
					</div>
				</article>
			</main>

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
								<input type="date" name="date" id="date" />
							</div>
							<div className="form-group">
								<label htmlFor="setBy">Set By *</label>
								<select name="setBy" id="setBy">
									<option value="Amad">Amad</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="class">Class *</label>
								<select name="class" id="class">
									<option value="JSS2">J.S.S.2</option>
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="subject">Subject *</label>
								<select name="subject" id="subject">
									<option value="sports">Sports</option>
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
								></textarea>
							</div>

							<button className="primary-btn">
								Add Assignment
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
