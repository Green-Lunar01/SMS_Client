import React, { useState } from "react";
import "./PromoteStudent.css";
import Modal from "../../../../components/Modal/Modal";
import { RiCloseLine } from "react-icons/ri";

const PromotionTable = () => {
	const [students, setStudents] = useState(
		Array(10).fill({
			name: "Charles Moore",
			matricNumber: "B3456700",
			currentClass: "J.S.S 2",
			promotedClass: "",
			isChecked: false,
		})
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (id) => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const [classMemberCount, setClassMemberCount] = useState(60);

	const handleCheck = (index) => {
		const updatedStudents = [...students];
		updatedStudents[index].isChecked = !updatedStudents[index].isChecked;
		setStudents(updatedStudents);
	};

	const handlePromoteAll = () => {
		const updatedStudents = students.map((student) => ({
			...student,
			promotedClass: student.promotedClass || "Promoted",
		}));
		setStudents(updatedStudents);
		openModal();
	};

	const handlePromoteMarked = () => {
		const updatedStudents = students.map((student) =>
			student.isChecked
				? {
						...student,
						promotedClass: student.promotedClass || "Promoted",
				  }
				: student
		);
		setStudents(updatedStudents);
		openModal();
	};

	const handleClassChange = (index, value) => {
		const updatedStudents = [...students];
		updatedStudents[index].promotedClass = value;
		setStudents(updatedStudents);
	};

	return (
		<div className="promotion-table">
			<div className="search-section">
				<input
					type="text"
					placeholder="J.S.S 2"
					className="search-input"
				/>
				<button className="search-button">Search</button>
			</div>

			<div className="table-actions">
				<h2>J.S.S 2</h2>
				<aside>
					<button
						className="action-button"
						onClick={handlePromoteMarked}
					>
						Promote Marked
					</button>
					<button
						className="action-button"
						onClick={handlePromoteAll}
					>
						Promote All
					</button>
				</aside>
			</div>
			<table className="student-table">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Matric Number</th>
						<th>Class</th>
						<th>Class Promoted To</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student, index) => (
						<tr key={index}>
							<td>
								<input
									type="checkbox"
									checked={student.isChecked}
									onChange={() => handleCheck(index)}
								/>
							</td>
							<td>{student.name}</td>
							<td>{student.matricNumber}</td>
							<td>{student.currentClass}</td>
							<td>
								<select
									value={student.promotedClass}
									onChange={(e) =>
										handleClassChange(index, e.target.value)
									}
								>
									<option value="">Select class</option>
									<option value="J.S.S 3">J.S.S 3</option>
									<option value="S.S.S 1">S.S.S 1</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="footer">
				<p>Class member: {classMemberCount}</p>
				<button className="submit-button">Submit</button>
			</div>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div className="promote-class-modal">
					<aside>
						<h3>Promote Class</h3>
						<RiCloseLine onClick={closeModal} />
					</aside>
					<main></main>
				</div>
			</Modal>
		</div>
	);
};

export default PromotionTable;
