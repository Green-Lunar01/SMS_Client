import React, { useState } from "react";
import "./TestResults.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import noReport from "../../../../assets/no-report.png";
import pdfIcon from "../../../../assets/pdf-icon.png";
import xlsIcon from "../../../../assets/xls-icon.png";
import csvIcon from "../../../../assets/csv-icon.png";
import { useTeacherAuth } from "../../../../Auth/context/TeacherAuthProvider";

const TestResults = () => {
  const [tab, setTab] = useState("one");
  const [searchQuery, setSearchQuery] = useState("");
  const {
    allClasses,
    classID,
    sessions,
    allSubjects,
    getExamResults,
	getTestResults,
	testResults,
    examResults,
  } = useTeacherAuth();

  const sampleData = [
    {
      id: 1,
      "test date": "22/06/2024",
      name: "Harry Marvin",
      "matric no": "B3472833",
      session: "2023/2024",
      class: "J.S.S 1",
      term: "Term 1",
      subject: "Maths",
      "total marks": "100",
      "marks obtained": "90",
    },
    {
      id: 2,
      "test date": "22/06/2024",
      name: "John Doe",
      "matric no": "B3472834",
      session: "2023/2024",
      class: "J.S.S 1",
      term: "Term 1",
      subject: "English",
      "total marks": "100",
      "marks obtained": "85",
    },
    {
      id: 3,
      "test date": "22/06/2024",
      name: "Jane Smith",
      "matric no": "B3472835",
      session: "2023/2024",
      class: "J.S.S 2",
      term: "Term 1",
      subject: "Science",
      "total marks": "100",
      "marks obtained": "88",
    },
    {
      id: 4,
      "test date": "22/06/2024",
      name: "Emily Brown",
      "matric no": "B3472836",
      session: "2023/2024",
      class: "J.S.S 2",
      term: "Term 2",
      subject: "Maths",
      "total marks": "100",
      "marks obtained": "92",
    },
    {
      id: 5,
      "test date": "22/06/2024",
      name: "Michael Johnson",
      "matric no": "B3472837",
      session: "2023/2024",
      class: "J.S.S 3",
      term: "Term 1",
      subject: "History",
      "total marks": "100",
      "marks obtained": "78",
    },
    {
      id: 6,
      "test date": "22/06/2024",
      name: "Sarah Lee",
      "matric no": "B3472838",
      session: "2023/2024",
      class: "J.S.S 3",
      term: "Term 2",
      subject: "Geography",
      "total marks": "100",
      "marks obtained": "95",
    },
  ];
  const [selectedSubID, setSelectedSubID] = useState("all");
  const [selectedClsID, setSelectedClsID] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const formatDate = (dateString) => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
  };
  const filteredData = testResults?.filter((item) => {
	
	const matchesSearch =
	  searchQuery === "" ||
	  Object.values(item).some((value) =>
		value.toString().toLowerCase().includes(searchQuery.toLowerCase())
	  );

	const matchesSubject =
	  selectedSubID === "all" || item.subject_id.toString() === selectedSubID;

	const matchesTerm = selectedTerm === "" || item.term.toString() === selectedTerm;

	const matchesSession =
	  selectedSessionId === "" || item.session_id.toString() === selectedSessionId;

	return matchesSearch &&  matchesTerm && matchesSession && matchesSubject;
  });
  console.log("On test  page:", filteredData) 


  return (
    <div className="test-results">
      {tab === "one" && (
        <div className="search-test-results-form">
          <div className="form-group">
            <label htmlFor="class">Select Class</label>
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
				  <option key={cls.id} value={cls.id.toString()}>
					{cls.class_name}
				  </option>
				))}
			  </select>
          </div>

          {/* <div className="form-group">
            <label htmlFor="testSubject">Select Test Subject</label>
			<select
				name="examSubject"
				id="examSubject"
				onChange={(e) => {
				  const selectedSubjectId = e.target.value;
				  setSelectedSubID(selectedSubjectId);
				}}
			  >
				<option value="all">Select Subject</option>
				{allSubjects.map((subject) => (
				  <option key={subject.id} value={subject.id.toString()}>
					{subject.subject_name}
				  </option>
				))}
			  </select>
          </div> */}

		  <button
			  className="primary-btn"
			  onClick={() => {
				getTestResults(selectedClsID);
				setTab("two");
			  }}
			>
			  Search
			</button>
        </div>
      )}

      {tab === "two" && (
        <div className="test-results-table">
          <section className="mid">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <aside>
			<select
				  name="subject"
				  id="subject"
				  onChange={(e) => setSelectedSubID(e.target.value)}
				>
				  <option value="all">All Subjects</option>
				  {allSubjects.map((subject) => (
					<option key={subject.id} value={subject.id.toString()}>
					  {subject.subject_name}
					</option>
				  ))}
				</select>
				<select
				  onChange={(e) => setSelectedTerm(e.target.value)}
				  name="term"
				  id="term"
				>
				  <option value="">Select Term</option>
				  <option value="1">Term 1</option>
				  <option value="2">Term 2</option>
				  <option value="3">Term 3</option>
				</select>
				<select
				  name="session"
				  id="session"
				  onChange={(e) => setSelectedSessionId(e.target.value)}
				>
				  <option value="">Select Session</option>
				  {sessions.map((session) => (
					<option key={session.id} value={session.id.toString()}>
					  {session.session_name}
					</option>
				  ))}
				</select>

              <div>
                <img src={pdfIcon} alt="" />
              </div>
              <div>
                <img src={xlsIcon} alt="" />
              </div>
              <div>
                <img src={csvIcon} alt="" />
              </div>
            </aside>
          </section>

          <table>
            <tr>
              <th>Test Date</th>
              <th>Name</th>
              <th>Matric Number</th>
              <th>Session</th>
              <th>Class</th>
              <th>Term</th>
              <th>Subject</th>
              <th>Total Marks</th>
              <th>Marks Obtained</th>
            </tr>
			{filteredData.map((item) => (
				  <tr key={Math.random()}>
					<td>{formatDate(item.test_date)}</td>
					
				
					<td>{item.student_name}</td>
					<td style={{ textAlign: "center" }}>{item.matric_number}</td>
					<td>{item.session_name}</td>
					<td>{item.class_name}</td>
					<td style={{ textAlign: "center" }}>{item.term}</td>
					<td>{item.subject_name}</td>
					<td style={{ textAlign: "center" }}>{item.total_mark}</td>
					<td style={{ textAlign: "center" }}>{item.score}</td>
				  </tr>
				))}
          </table>
		  {filteredData.length === 0 && (
			  <section className="w-full h-auto flex justify-center items-center">
				<div className="dummyDiv flex flex-col gap-8 my-[60px]">
				  <img src="/icons/dummy.svg" alt="No data" />
				  <h1 className="font-normal text-[16px] text-center">
					No Test Results Available
				  </h1>
				</div>
			  </section>
			)}
        </div>
      )}
    </div>
  );
};

export default TestResults;
