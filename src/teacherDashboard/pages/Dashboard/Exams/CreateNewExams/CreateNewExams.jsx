import React, { useState, useEffect } from "react";
import "./CreateNewExams.css";
import { BsArrowLeft } from "react-icons/bs";
import { useTeacherAuth } from "../../../../Auth/context/TeacherAuthProvider";

const CreateNewExams = () => {
  const { allClasses, classID, sessions, allSubjects, createExamFn, examData, addExamScore, loading } =
    useTeacherAuth();

  useEffect(() => {
    console.log(
      "Create Exam page: ",
      allClasses,
      classID,
      sessions,
      allSubjects
    );
  }, []);

  console.log("students: ", examData?.students);
  const [scores, setScores] = useState([]);
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSubID, setSelectedSubID] = useState(0);
  const [selectedSub, setSelectedSub] = useState();
  const [selectedClsID, setSelectedClsID] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState(0);
  const [selectedSessionId, setSelectedSessionId] = useState();
  const [selectedSession, setSelectedSession] = useState();
  const [selectedDuration, setSelectedDuration] = useState();
  const [date, setDate] = useState();
  const [totalMark, setTotalMark] = useState(0);

  const handleScoreChange = (studentId, value) => {
    setScores((prevScores) => {
      const updatedScores = [...prevScores];
      const studentIndex = updatedScores.findIndex(
        (s) => s.student_id === studentId
      );

      if (studentIndex !== -1) {
        updatedScores[studentIndex].score = value;
      } else {
        updatedScores.push({ student_id: studentId, score: value });
      }

      return updatedScores;
    });
  };
  const scoresData = {
    exam_id: examData?.examId,
    scores: scores,
  };
  const myCreateExamData = {
    class_id: parseInt(selectedClsID),
    sessionId: parseInt(selectedSessionId),
    term: parseInt(selectedTerm),
    subject_id: parseInt(selectedSubID),
    date,
    total_mark: parseInt(totalMark),
  };
  const [tab, setTab] = useState("one");
  console.log("class:", selectedClass, myCreateExamData);

  return (
    <div className="create-new-exams">
      {tab === "one" && (
        <div className="search-tab">
         
          <select
            name="class"
            id="class"
            onChange={(e) => {
              const selectedClassId = e.target.value;
              setSelectedClsID(selectedClassId);

              // Debugging: Log to check values
              console.log("Selected Class ID:", selectedClassId);

              // Ensure type match (convert `cls.id` to string if needed)
              const selectedClassObj = allClasses.find(
                (cls) => String(cls.id) === selectedClassId
              );

              // Debugging: Log the found object
              console.log("Selected Class Object:", selectedClassObj);

              setSelectedClass(
                selectedClassObj ? selectedClassObj.class_name : ""
              );
            }}
          >
            <option value="">Select Class</option>
            {allClasses.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.class_name}
              </option>
            ))}
          </select>
          <button className="primary-btn" onClick={() => setTab("two")}>
            Search
          </button>
        </div>
      )}

      {tab === "two" && (
        <div className="create-new-exams-form">
          <h3>{selectedClass}</h3>

          <div className="form-group">
            <label htmlFor="date">Exam Date(*</label>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name="date"
              id="date"
              value={date}
            />
          </div>

          <div className="form-group">
            <label htmlFor="term">Term</label>
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

          {/* Session Selection */}
          <div className="form-group">
            <label htmlFor="session">Session</label>
            <select
              name="session"
              id="session"
              onChange={(e) => {
                const sessionID = e.target.value;
                setSelectedSessionId(e.target.value);

                const filterSession = sessions.find(
                  (session) => String(session.id) === sessionID
                );

                setSelectedSession(filterSession?.session_name || ""); // Prevents undefined errors
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

          {/* Subject Selection */}
          <div className="form-group">
            <label htmlFor="examSubject">Select Exam Subject</label>
            <select
              name="examSubject"
              id="examSubject"
              onChange={(e) => {
                const subjectID = e.target.value;
                setSelectedSubID(subjectID);

                const filteredSubject = allSubjects.find(
                  (subject) => String(subject.id) === subjectID
                );

                setSelectedSub(filteredSubject?.subject_name || ""); // Prevents undefined errors
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
            <label htmlFor="examMark">Exam Mark</label>
            <input
              onChange={(e) => setTotalMark(e.target.value)}
              value={totalMark}
              type="number"
              name="examMark"
              id="examMark"
            />
          </div>

          <button
            className="primary-btn"
            onClick={() => {
              createExamFn(myCreateExamData, setTab, "three");
            }}
          >
           {loading ? (
              <div className="w-5 h-5 border-2 border-t-2 rounded-full border-t-green-500 border-gray-700 animate-spin mx-4 my-[2px]"></div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      )}
      {tab === "three" && (
        <div className="new-exams-table">
          <span>
            <BsArrowLeft onClick={() => setTab("two")} />
            <h5>
              Kindly Include Marks Received for {selectedClass} in the{" "}
              {selectedSub} Exam For {selectedSession}
            </h5>
          </span>

          <table>
            <tr>
              <th>Student Name</th>
              <th>Matric Number</th>
              <th>Obtained Marks/100</th>
            </tr>
            {examData.students.map((student) => (
              <tr key={student.id}>
                <td>{student.student_name}</td>
                <td>{student.matric_number}</td>
                <td className="marks">
                  <input
                    type="number"
                    name="score"
                    value={
                      scores.find((s) => s.student_id === student.id)?.score ||
                      ""
                    }
                    placeholder="Score"
                    onChange={(e) =>
                      handleScoreChange(student.id, Number(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
            {(!examData.students || examData.students.length === 0) && (
              <section className="w-full h-auto  flex justify-center items-center">
                <div className="dummyDiv flex flex-col gap-8 my-[60px]">
                  <img src="/icons/dummy.svg" />
                  <h1 className="font-normal text-[16px] text-center">
                    There are no students in this class
                  </h1>
                </div>
              </section>
            )}
          </table>
          <button
            onClick={() => addExamScore(scoresData)}
            className="primary-btn"
          > { loading ? (
           <div className="w-5 h-5 border-2 border-t-2 rounded-full border-t-green-500 border-gray-700 animate-spin mx-4 my-[2px]"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateNewExams;
