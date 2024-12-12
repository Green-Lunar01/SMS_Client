import React from 'react'
import Chart from '../components/Chart/Chart'
import FinalResultTable from '../components/ResultTables/FinalResultTable'
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";


function Report() {
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
  const reportData =[
    {
      "id": 1,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
    {
      "id": 2,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
    {
      "id": 3,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
    {
      "id": 4,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
    {
      "id": 5,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
    {
      "id": 6,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
    {
      "id": 7,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
    {
      "id": 8,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
    {
      "id": 9,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
    {
      "id": 10,
      'subject': "English",
      "testA": 20,
      "testB": 30,
      "testC": 40,
      "exam" : 70,
      "grade": "f",
    },
  ]
  return (
    <div>
      <div className="w-full flex-container bg-[#fdfdfd]">
        <div className="flex-container-col lg:w-11/12 mt-[40px]">
          <div className="flex-container h-[50px]">
            <h1 className="screen-hd">Report Card</h1>
          </div>
          <section className='report lg:w-[97%] mb-[40px]  shadow-[0px_4px_25px_0] shadow-[#d9d9d9]'>
                <div className="w-full flex-container-between  bg-[#fcfcfc] gap-[50px] py-[30px]">
                    
                    <div className="w-11/12 flex  gap-[28px] px-5 ">
                    <input
                        placeholder="Term 1"
                        className="dropdown-input w-[100px]"
                    />
                    <input
                        placeholder="2023/2024"
                        className="dropdown-input w-[150px]"
                    />
                    <div className=" flex-container gap-[20px] bg-[#f7f7f7] rounded-[6px] px-4 py-4">
                    
                    </div>
                    </div>
                </div>
          <div className="lg:w-full  h-[65px] flex-container-between items-center bg-white border-1 border-b border-[#13A541]">
            <h3 className="font-semibold text-[18px] text-[#13A541] pl-5 align-middle">J.S.S 1A</h3>
            <div className='w-14 h-[48px] bg-[#f7f7f7] mr-[40px] flex-container'>
             <button onClick={exportToPDF}>
             <img src='/icons/pdf.svg'/>
             </button>
               </div>
            {/* <AssessmentTable tableData={examTable} /> */}

          </div>
          <FinalResultTable reportData={reportData}/>
         

          </section>
        </div>
      </div>
    </div>
  )
}

export default Report