import React, { useState, useEffect } from "react";
import "./Questions.css";
import { LuPlus } from "react-icons/lu";
import { RiCloseLine } from "react-icons/ri";
import Modal from "../../../components/Modal/Modal";
import QuestionPapers from "./QuestionPapers/QuestionPapers";
import { useTeacherAuth } from "../../../Auth/context/TeacherAuthProvider";

const Questions = () => {
  const {
    setQuestionsFn,
    currentSessionName,
    sessions,
    allClasses,
    classID,
    allSubjects,
  } = useTeacherAuth();

  useEffect(() => {
    console.log(
      "Question data:",
      currentSessionName,
      classID,
      allSubjects,
      allClasses,
      sessions
    );
  }, []);

  const [selectedSubID, setSelectedSubID] = useState(0);
  const [selectedClsID, setSelectedClsID] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState(0);
  const [selectedSession, setSelectedSession] = useState();
  const [selectedDuration, setSelectedDuration] = useState();

  const [tab, setTab] = useState("one");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([
    {
      questionType: "multiple_choice",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
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
      {
        questionType: "multiple_choice",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "questionType") {
      updatedQuestions[index].questionType = value;
      updatedQuestions[index].options =
        value === "multiple_choice" ? ["", "", "", ""] : undefined;
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
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
      (_, oIndex) => oIndex !== optIndex
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    const questionSchema = {
      subjectId: parseInt(selectedSubID, 10),
      sessionId: parseInt(selectedSession, 10),
      classId: parseInt(selectedClsID, 10),
      term: parseInt(selectedTerm, 10),
      academic_session: parseInt(selectedSession, 10),
      examDuration: selectedDuration,
      questionData: questions,
    };
	setQuestionsFn(questionSchema)
    console.log("Questions:", questions, questionSchema);
    
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
                  <label htmlFor="subject">Select Subject*</label>
                  <select
                    name="subject"
                    id="subject"
                    onChange={(e) => setSelectedSubID(e.target.value)}
                  >
                    <option value="">Select Subject</option>
                    {allSubjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.subject_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="class">Class*</label>
                  <select
                    name="class"
                    id="class"
                    onChange={(e) => setSelectedClsID(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    {allClasses.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.class_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="term">Term*</label>
                  <select
                    name="term"
                    id="term"
                    onChange={(e) => setSelectedTerm(e.target.value)}
                  >
                    <option value="">Select Term</option>
                    <option value="1">Term 1</option>
                    <option value="2">Term 2</option>
                    <option value="3">Term 3</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="session">Session</label>
                  <select
                    name="session"
                    id="session"
                    onChange={(e) => setSelectedSession(e.target.value)}
                  >
                    <option value="">Select Session</option>
                    {sessions.map((session) => (
                      <option key={session.id} value={session.id}>
                        {session.session_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <input
                    type="time"
                    name="duration"
                    id="duration"
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value
                        .split(":")
                        .map(Number);
                      const totalMinutes = hours * 60 + minutes;
                      setSelectedDuration(totalMinutes);
                    }}
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
                            updateQuestion(qIndex, "question", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <select
                          value={question.questionType}
                          onChange={(e) =>
                            updateQuestion(
                              qIndex,
                              "questionType",
                              e.target.value
                            )
                          }
                        >
                          <option value="multiple_choice">
                            Multiple choice
                          </option>
                          <option value="true_false">True/False</option>
                          <option value="essay">Essay</option>
                          <option value="completion">Completion</option>
                        </select>
                      </div>
                    </article>
                    <article className="options-row">
                      {question.questionType === "multiple_choice" && (
                        <>
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="form-group option">
                              <input
                                type="text"
                                placeholder={`Option ${String.fromCharCode(
                                  65 + optIndex
                                )}`}
                                value={option}
                                onChange={(e) =>
                                  updateOption(qIndex, optIndex, e.target.value)
                                }
                              />
                              <button
                                className="remove-option-btn"
                                onClick={() => removeOption(qIndex, optIndex)}
                              >
                                <RiCloseLine />
                              </button>
                            </div>
                          ))}
                          <button
                            className="add-option-btn"
                            onClick={() => addOption(qIndex)}
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
                        value={question.correctAnswer}
                        onChange={(e) =>
                          updateQuestion(
                            qIndex,
                            "correctAnswer",
                            e.target.value
                          )
                        }
                      />
                      <button
                        className="remove-question-btn"
                        onClick={() => removeQuestion(qIndex)}
                      >
                        <RiCloseLine />
                      </button>
                    </div>
                  </div>
                ))}
                <button className="add-question-btn" onClick={addQuestion}>
                  <LuPlus /> Add More Questions
                </button>
              </section>

              <button className="primary-btn" onClick={handleSubmit}>
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
