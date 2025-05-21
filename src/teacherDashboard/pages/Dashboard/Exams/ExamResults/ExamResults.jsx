import React, { useState } from "react";
import "./ExamResults.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import noReport from "../../../../assets/no-report.png";
import pdfIcon from "../../../../assets/pdf-icon.png";
import xlsIcon from "../../../../assets/xls-icon.png";
import csvIcon from "../../../../assets/csv-icon.png";
import { useTeacherAuth } from "../../../../Auth/context/TeacherAuthProvider";
import { BsCloudSleetFill } from "react-icons/bs";

const ExamResults = () => {
	const [tab, setTab] = useState("one");
	const [searchQuery, setSearchQuery] = useState("");
	const {
	  allClasses,
	  classID,
	  sessions,
	  allSubjects,
	  getExamResults,
	  examResults,
	} = useTeacherAuth();
	
	
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
  
	const filteredData = examResults?.filter((item) => {
	
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
  
	  return matchesSearch && matchesTerm && matchesSubject && matchesSession;
	});
    console.log("On exam  page:", filteredData) 
  
	return (
	  <div className="exam-results">
		{tab === "one" && (
		  <div className="search-exam-results-form">
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
  
			<div className="form-group">
			  <label htmlFor="examSubject">Select Exam Subject</label>
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
			</div>
			<button
			  className="primary-btn"
			  onClick={() => {
				getExamResults(selectedClsID, selectedSubID);
				setTab("two");
			  }}
			>
			  Search
			</button>
		  </div>
		)}
  
		{tab === "two" && (
		  <div className="exam-results-table">
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
			  <thead>
				<tr>
				  <th>Exam Date</th>
				  <th>Name</th>
				  <th>Matric Number</th>
				  <th>Session</th>
				  <th>Class</th>
				  <th>Term</th>
				  <th>Subject</th>
				  <th>Total Marks</th>
				  <th>Marks Obtained</th>
				</tr>
			  </thead>
			  <tbody>
				{filteredData.map((item) => (
				  <tr key={Math.random()}>
					<td>{formatDate(item.exam_date)}</td>
					
				
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
			  </tbody>
			</table>
			{filteredData.length === 0 && (
			  <section className="w-full h-auto flex justify-center items-center">
				<div className="dummyDiv flex flex-col gap-8 my-[60px]">
				  <img src="/icons/dummy.svg" alt="No data" />
				  <h1 className="font-normal text-[16px] text-center">
					No Exam Results Available
				  </h1>
				</div>
			  </section>
			)}
		  </div>
		)}
	  </div>
	);
  };
  

export default ExamResults;
