import React, { useState, useEffect } from "react";
import "./UserAccess.css";
import Modal from "../../../components/Modal/Modal";
import school from "../../../assets/school.png";
import personImg from "../../../assets/person-img.png";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
import RolePrivileges from "./RolePrivileges/RolePrivileges";

const UserAccess = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectOption, setSelectOption] = useState("");
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [showRolePrivileges, setShowRolePrivileges] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectOption("");
	};

	const openDeleteModal = () => {
		setIsDeleteModalOpen(true);
	};
	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
	};

	const [users, setUsers] = useState([
		{
			id: 1,
			name: "Stella Hope",
			email: "Stella_Hope@yahoo.com",
			role: "Admin/Owner",
			status: "Active",
		},
		{
			id: 2,
			name: "Stella Hope",
			email: "Stella_Hope@yahoo.com",
			role: "Principal",
			status: "Active",
		},
		{
			id: 3,
			name: "Stella Hope",
			email: "Stella_Hope@yahoo.com",
			role: "Accountant",
			status: "Active",
		},
	]);

	useEffect(() => {
		if (selectOption === "user" || selectOption === "role") {
			openModal();
		}
		// console.log(selectOption);
		// console.log(isModalOpen);
	}, [selectOption]);

	return (
		<div className="user-access-screen">
			<article className="user-article main">
				<div className="img-box">
					<img src={school} alt="image" />
				</div>
				<aside>
					<div className="details">
						<span>
							<h3>Hope College</h3>
							<button className="role">Admin/Owner</button>
						</span>
						<span>
							<p className="status">Active</p>
							<p>Stella_Hope@yahoo.com</p>
						</span>
					</div>

					<div className="actions">
						<button
							onClick={() =>
								setShowRolePrivileges(!showRolePrivileges)
							}
						>
							Role Privileges
						</button>
						<select
							name="add-button"
							id="add-button"
							className="primary-btn"
							onChange={(e) => setSelectOption(e.target.value)}
						>
							<option value="">Add</option>
							<option value="user">User</option>
							<option value="role">Role</option>
						</select>
					</div>
				</aside>
			</article>

			{showRolePrivileges && <RolePrivileges />}

			<section className="other-users">
				<h2>Other Users</h2>
				{users.map((user) => (
					<article key={user.id} className="user-article">
						<div className="img-box">
							<img src={personImg} alt="image" />
						</div>
						<aside>
							<div className="details">
								<span>
									<h3>{user.name}</h3>
									<button className="role">
										{user.role}
									</button>
								</span>
								<span>
									<p className="status">{user.status}</p>
									<p>{user.email}</p>
								</span>
							</div>

							<RiDeleteBin6Line onClick={openDeleteModal} />
						</aside>

						<Modal
							isOpen={isDeleteModalOpen}
							onClose={closeDeleteModal}
						>
							<div className="delete-user-modal">
								<aside>
									<h3>Delete User</h3>
									<RiCloseLine onClick={closeDeleteModal} />
								</aside>
								<main>
									<p className="delete-text">
										Are you sure you want to delete user{" "}
										<strong>{user.name}</strong>?
									</p>
									<div className="actions">
										<button className="delete-btn">
											Delete
										</button>
										<button onClick={closeDeleteModal}>
											Cancel
										</button>
									</div>
								</main>
							</div>
						</Modal>
					</article>
				))}
			</section>

			<Modal isOpen={isModalOpen} closeModal={closeModal}>
				{selectOption === "user" && (
					<div className="add-user-modal">
						<aside>
							<h3>Add User</h3>
							<RiCloseLine onClick={closeModal} />
						</aside>

						<main>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Enter the user name here"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email">Email Address</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Enter the user email here"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="role">Role</label>
								<select name="role" id="role">
									<option value="">Select Role</option>
									<option value="principal">Principal</option>
									<option value="accountant">
										Accountant
									</option>
								</select>
							</div>

							<div className="actions">
								<button className="primary-btn">Add</button>
								<button onClick={closeModal}>Cancel</button>
							</div>
						</main>
					</div>
				)}

				{selectOption === "role" && (
					<div className="add-role-modal">
						<aside>
							<h3>Add Role</h3>
							<RiCloseLine onClick={closeModal} />
						</aside>
						<main>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Enter the role name here"
								/>
							</div>

							<div className="actions">
								<button className="primary-btn">Add</button>
								<button onClick={closeModal}>Cancel</button>
							</div>
						</main>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default UserAccess;
