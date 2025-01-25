import React, { useState } from "react";
import "./Questions.css";
import { LuPlus } from "react-icons/lu";
import { RiCloseLine } from "react-icons/ri";
import Modal from "../../../components/Modal/Modal";
import QuestionPapers from "./QuestionPapers/QuestionPapers";

const Questions = () => {
	const [tab, setTab] = useState("one");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [questions, setQuestions] = useState([
		{ type: "Multiple choice", options: ["", "", "", ""], answer: "" },
	]);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const addQuestion = () => {
		setQuestions([
			...questions,
			{ type: "Multiple choice", options: ["", "", "", ""], answer: "" },
		]);
	};

	const removeQuestion = (index) => {
		const updatedQuestions = questions.filter(
			(_, qIndex) => qIndex !== index
		);
		setQuestions(updatedQuestions);
	};

	const updateQuestion = (index, field, value) => {
		const updatedQuestions = [...questions];
		if (field === "type") {
			updatedQuestions[index] = {
				type: value,
				options: value === "Multiple choice" ? ["", "", "", ""] : [],
				answer: "",
			};
		} else {
			updatedQuestions[index][field] = value;
		}
		setQuestions(updatedQuestions);
	};

	const updateOption = (qIndex, optIndex, value) => {
		const updatedQuestions = [...questions];
		updatedQuestions[qIndex].options[optIndex] = value;
		setQuestions(updatedQuestions);
	};

	const addOption = (index) => {
		const updatedQuestions = [...questions];
		updatedQuestions[index].options.push("");
		setQuestions(updatedQuestions);
	};

	const removeOption = (qIndex, optIndex) => {
		const updatedQuestions = [...questions];
		updatedQuestions[qIndex].options = updatedQuestions[
			qIndex
		].options.filter((_, oIndex) => oIndex !== optIndex);
		setQuestions(updatedQuestions);
	};

	const handleSubmit = () => {
		console.log("Questions:", questions);
	};

	return (
		<div className="questions-screen">
			<aside>
				<button
					onClick={() => setTab("one")}
					className={tab === "one" ? "active" : ""}
				>
					Create New
				</button>
				<button
					onClick={() => setTab("two")}
					className={tab === "two" ? "active" : ""}
				>
					Question Papers
				</button>
			</aside>

			{tab === "one" && (
				<div className="create-questions">
					<button className="primary-btn" onClick={openModal}>
						<LuPlus />
						<p>Create New Questions</p>
					</button>
				</div>
			)}

			{tab === "two" && <QuestionPapers />}

			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={closeModal}>
					<div className="create-question-modal">
						<aside>
							<h3>Create New Questions</h3>
							<RiCloseLine onClick={closeModal} />
						</aside>
						<main>
							<section className="top">
								<div className="form-group">
									<label htmlFor="subject">
										Select Subject*
									</label>
									<select name="subject" id="subject">
										<option value="Math">Math</option>
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="class">Class*</label>
									<select name="class" id="class">
										<option value="J.S.S 1">J.S.S 1</option>
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="term">Term*</label>
									<select name="term" id="term">
										<option value="term1">Term 1</option>
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="session">Session</label>
									<select name="session" id="session">
										<option value="2023/2024">
											2023/2024
										</option>
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="duration">Duration</label>
									<input
										type="time"
										name="duration"
										id="duration"
									/>
								</div>
							</section>

							<section className="bottom">
								{questions.map((question, qIndex) => (
									<div key={qIndex} className="question-item">
										<article className="question-row">
											<div className="form-group">
												<label>{qIndex + 1}</label>
												<input
													type="text"
													placeholder="Enter question"
													onChange={(e) =>
														updateQuestion(
															qIndex,
															"question",
															e.target.value
														)
													}
												/>
											</div>
											<div className="form-group">
												<select
													value={question.type}
													onChange={(e) =>
														updateQuestion(
															qIndex,
															"type",
															e.target.value
														)
													}
												>
													<option value="Multiple choice">
														Multiple choice
													</option>
													<option value="True/False">
														True/False
													</option>
													<option value="Essay">
														Essay
													</option>
													<option value="Completion">
														Completion
													</option>
												</select>
											</div>
										</article>
										<article className="options-row">
											{question.type ===
												"Multiple choice" && (
												<>
													{question.options.map(
														(option, optIndex) => (
															<div
																key={optIndex}
																className="form-group option"
															>
																<input
																	type="text"
																	placeholder={`Option ${String.fromCharCode(
																		65 +
																			optIndex
																	)}`}
																	value={
																		option
																	}
																	onChange={(
																		e
																	) =>
																		updateOption(
																			qIndex,
																			optIndex,
																			e
																				.target
																				.value
																		)
																	}
																/>
																<button
																	className="remove-option-btn"
																	onClick={() =>
																		removeOption(
																			qIndex,
																			optIndex
																		)
																	}
																>
																	<RiCloseLine />
																</button>
															</div>
														)
													)}
													<button
														className="add-option-btn"
														onClick={() =>
															addOption(qIndex)
														}
													>
														<LuPlus />
													</button>
												</>
											)}
										</article>
										<div className="form-group answer">
											<label>Ans</label>
											<input
												type="text"
												placeholder="Enter answer"
												value={question.answer}
												onChange={(e) =>
													updateQuestion(
														qIndex,
														"answer",
														e.target.value
													)
												}
											/>
											<button
												className="remove-question-btn"
												onClick={() =>
													removeQuestion(qIndex)
												}
											>
												<RiCloseLine />
											</button>
										</div>
									</div>
								))}
								<button
									className="add-question-btn"
									onClick={addQuestion}
								>
									<LuPlus /> Add More Questions
								</button>
							</section>

							<button
								className="primary-btn"
								onClick={handleSubmit}
							>
								Save
							</button>
						</main>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Questions;
