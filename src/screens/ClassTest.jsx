import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AssessmentTable from "../components/ResultTables/AssessmentTable";
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
      totalMarks: 40,
      marksObtained: 20,
    },
    {
      subject: "English ",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 40,
      marksObtained: 20,
    },
    {
      subject: "Basic Science",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 40,
      marksObtained: 40,
    },
    {
      subject: "Fine Arts/Creative Art",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 40,
      marksObtained: 40,
    },
    {
      subject: "Civic Education",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 40,
      marksObtained: 40,
    },
    {
      subject: "Business Studies",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 40,
      marksObtained: 40,
    },
    {
      subject: "Computer Studies",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 40,
      marksObtained: 40,
    },
    {
      subject: "Home Economics",
      session: "2024/2025",
      class: "JSS1",
      term: "Term 1",
      totalMarks: 40,
      marksObtained: 40,
    },
   
  ];

  return (
    <div>
      <div className="w-full flex-container bg-[#fdfdfd]">
        <div className="flex-container-col lg:w-11/12 mt-[40px]">
          <div className="flex-container h-[50px]">
            <h1 className="screen-hd">Exams</h1>
          </div>
          <div className="flex-container-between bg-[#fdfdfd] gap-[50px] my-[30px]">
            <div className="flex justify-normal gap-4 w-[50%]">
              <div className="relative">
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
                  className="w-[200px] border-[1px] border-[#d9d9d9] rounded-[26px] h-[50px] px-[16px] py-[20px]"
                />
              </div>
              {/* Search Button */}
              <button
                type="submit"
                className="bg-[#13A541] text-center text-white h-[50px] px-[25px] rounded-[10px]"
              >
                Search
              </button>
            </div>
            <div className="flex-container gap-[28px] w-[50%]">
              <input
                placeholder="Term 1"
                className="dropdown-input w-[100px]"
              />
              <input
                placeholder="2023/2024"
                className="dropdown-input w-[150px]"
              />
              <div className=" flex-container gap-[20px] bg-[#f7f7f7] rounded-[6px] px-4 py-4">
               <button>
               <img  onClick={exportToExcel} src="/icons/xls.svg" alt="XLS" />
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
          <div className="lg:w-10/12 mb-4">
            <h3 className="font-bold text-[14px]">J.S.S 1</h3>
            <AssessmentTable tableData={examTable} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Exams;
