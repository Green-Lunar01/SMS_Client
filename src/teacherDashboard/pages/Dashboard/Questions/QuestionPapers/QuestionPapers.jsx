import React, { useEffect, useState } from "react";
import "./QuestionPapers.css";
import { TfiDownload } from "react-icons/tfi";
import { RiEdit2Line } from "react-icons/ri";
import { useTeacherAuth } from "../../../../Auth/context/TeacherAuthProvider";

const QuestionPapers = () => {
  const {
    setQuestion,
    currentSession,
    classID,
    allSubjects,
    allClasses,
    getQuestionPapers,
    examPapers,
    sessions,
    loading,
    createExamFn,
  } = useTeacherAuth();
  const [selectedSubID, setSelectedSubID] = useState();
  const [selectedClsID, setSelectedClsID] = useState();
  const [selectedSessionId, setSelectedSessionId] = useState();
  const [selectedSession, setSelectedSession] = useState();
  const [selectedTerm, setSelectedTerm] = useState();
  useEffect(() => {
    console.log(
      "Question data:",

      examPapers
    );
  }, []);
  return (
    <div className="question-papers">
      <section className="top">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="subject">Select Subject*</label>
            <select
              name="examSubject"
              id="examSubject"
              onChange={(e) => {
                const subjectID = e.target.value;
                setSelectedSubID(subjectID);
              }}
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
              onChange={(e) => {
                const selectedClassId = e.target.value;
                setSelectedClsID(selectedClassId);
              }}
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
            <label htmlFor="term">Term</label>
            <select
              onChange={(e) => setSelectedTerm(e.target.value)}
              name="term"
              id="term"
            >
              <option value="">Select Term </option>
              <option value={1}>Term 1</option>
              <option value={2}>Term 2</option>
              <option value={3}>Term 3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="session">Session</label>
            <select
              name="session"
              id="session"
              onChange={(e) => {
                const sessionID = e.target.value;
                setSelectedSessionId(sessionID);

                const sessionName = sessions.find(
                  (session) => String(session.id) === sessionID
                );

                setSelectedSession(sessionName ? sessionName.session_name : "");
              }}
            >
              <option value="">Select Session</option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.session_name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() =>
              getQuestionPapers(
                classID,
                selectedSubID,
                selectedTerm,
                selectedSessionId
              )
            }
            className="primary-btn"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-t-2 rounded-full border-t-green-500 border-gray-700 animate-spin mx-4 my-[2px]"></div>
            ) : (
              "Search"
            )}
          </button>
        </div>
        <button className="download-btn">
          <TfiDownload />
          <span>Download</span>
        </button>
      </section>
      {(!examPapers || examPapers.length === 0) && (
          <section className="w-full h-auto  flex justify-center items-center">
            <div className="dummyDiv flex flex-col gap-8 my-[60px]">
              <img src="/images/questiondummy.svg" />
              <h1 className="font-normal text-[16px] text-center">
                Search for a questions paper
              </h1>
            </div>
          </section>
        )}
        {
          examPapers &&
          <section className="bottom">
          <span>
            <RiEdit2Line />
          </span>
          <main>
            <header>
              <h1 className="flex w-full justify-center font-semibold tracking-wider">
                {examPapers?.data.subject_name} {examPapers?.data.class_name}{" "}
                {examPapers?.data.term} Term {selectedSession}
              </h1>
              <p>
                Duration: {" "}
                {(() => {
                  const minutes = examPapers.data.duration;
                  const hours = Math.floor(minutes / 60);
                  const remainingMinutes = minutes % 60;
  
                  return remainingMinutes === 0
                    ? `${hours} ${hours === 1 ? "hr" : "hrs"}`
                    : `${hours} ${hours === 1 ? "hr" : "hrs"} ${remainingMinutes} mins`;
                })()}
              </p>
            </header>
            <section>
              {examPapers.data.questions.map((question, index) => (
                <div key={index} className="flex flex-col gap-2 mb-4">
                  {/* Question */}
                  <p className="">
                    {index + 1}. {question.question}
                  </p>
  
                  {/* Options (if available) */}
                  {question.options && (
                    <p className="flex flex-wrap gap-x-10 md:gap-x-14 lg:gap-x-20">
                      {question.options.map((option, optionIndex) => (
                        <span key={optionIndex}>
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </span>
                      ))}
                    </p>
                  )}
  
                  {/* Answer */}
                  <div className="flex gap-2 items-center">
                    <span className="text-[#FBAE44] font-normal">Ans.</span>
                    {question.options
                      ? `${String.fromCharCode(65 + question.options.indexOf(question.correct_answer))}. `
                      : ""}
                    <p>{question.correct_answer}</p>
                  </div>
                </div>
              ))}
            </section>
          </main>
        </section>
        }
      
    </div>
  );
};

export default QuestionPapers;
