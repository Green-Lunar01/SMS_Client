import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AssessmentTable from "../components/ResultTables/AssessmentTable";
import Chart  from "../components/Chart/Chart";
function Exams() {
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const exportToCSV = () => {
    const csvData = examTable.map(row => ({
      Subject: row.subject,
      Session: row.session,
      Class: row.class,
      Term: row.term,
      "Total Marks": row.totalMarks,
      Obtained: row.marksObtained,
    }));

    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exams");

    const csvOutput = XLSX.write(workbook, { bookType: "csv", type: "array" });
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "exam_data.csv");
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(examTable);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exams");

    const excelOutput = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelOutput], { type: "application/octet-stream" });
    saveAs(blob, "exam_data.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Subject", "Session", "Class", "Term", "Total Marks", "Obtained"];
    const tableRows = examTable.map(row => [
      row.subject,
      row.session,
      row.class,
      row.term,
      row.totalMarks,
      row.marksObtained,
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("exam_data.pdf");
  };

  const handleVisible = () => {
    setVisible(false);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    if (!value) setVisible(true);
  };
  const examTable = [
    {
      subject: "Mathematics",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 60,
      marksObtained: 40,
    },
    {
      subject: "English ",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 60,
      marksObtained: 40,
    },
    {
      subject: "Basic Science",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 60,
      marksObtained: 40,
    },
    {
      subject: "Fine Arts/Creative Art",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 60,
      marksObtained: 40,
    },
    {
      subject: "Civic Education",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 60,
      marksObtained: 40,
    },
    {
      subject: "Business Studies",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 60,
      marksObtained: 40,
    },
    {
      subject: "Computer Studies",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 60,
      marksObtained: 40,
    },
    {
      subject: "Home Economics",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 60,
      marksObtained: 40,
    },
   
  ];

  return (
    <div>
      <div className="w-full flex-container bg-[#fdfdfd]">
        <div className="w-11/12 flex flex-col md:items-start items-center  lg:w-11/12 mt-[40px]">
          <div className="w-full flex-container h-[50px]">
            <h1 className="screen-hd w-full flex justify-center  ">Exams</h1>
          </div>
          <div className="md:w-full w-11/12 md:flex bg-[#fdfdfd]  gap-[50px] my-[30px]">
            <div className="flex justify-normal   md:gap-4 gap-3 md:w-[50%]">
              <div className="w-full relative">
                {visible && !value && (
                  <div
                    onClick={handleVisible}
                    className="input-active absolute top-[12px] left-[16px] flex justify-normal gap-[17px]"
                  >
                    <img
                      className=""
                      src="/icons/search.svg"
                      alt="Search icon"
                    />
                    <p className="text-[#8e98a8]">Search</p>
                  </div>
                )}
                {/* Input Field */}
                <input
                  ref={inputRef} // Attach the reference here
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onFocus={handleVisible}
                  onBlur={handleBlur}
                  placeholder=""
                  className="md:w-[200px] w-full border-[1px] border-[#d9d9d9] rounded-[26px] h-[50px] px-[16px] py-[20px]"
                />
              </div>
              {/* Search Button */}
              <button
                type="submit"
                className="bg-[#13A541] text-center text-white h-[50px] w-[50%] px-[25px] rounded-[10px]"
              >
                Search
              </button>
            </div>
            <div className="md:w-full flex-container my-4 md:my-0 md:gap-[28px] gap-2  w-[50%]">
              <input
                placeholder="Term 1"
                className="dropdown-input md:w-[100px] w-[35%]"
              />
              <input
                placeholder="2023/2024"
                className="dropdown-input md:w-[150px] w-[35%]"
              />
              <div className=" flex-container gap-[20px] bg-[#f7f7f7] rounded-[6px] px-4 py-4">
               <button>
               <img className="w-auto"  onClick={exportToExcel} src="/icons/xls.svg" alt="XLS" />
               </button>
               <button>
                <img  onClick={exportToCSV} src="/icons/csv.svg" alt="CSV" />

               </button>
               <button>
                <img onClick={exportToPDF} src="/icons/pdf.svg" alt="PDF" />

               </button>
              </div>
            </div>
          </div>
          <div className="lg:w-10/12 w-full mt-4 mb-5">
            <h3 className="font-bold text-[14px]">J.S.S 1</h3>
            <div className=" w-full overflow-x-auto">
            <AssessmentTable tableData={examTable} />
            </div>
            {/* <Chart /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exams;
