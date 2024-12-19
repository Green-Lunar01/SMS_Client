import React, {useRef} from 'react'


import FinalResultTable from '../components/ResultTables/FinalResultTable'

import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";


function Report() {
  const tableRef = useRef(); 

  const exportToPDF = async () => {
    const input = tableRef.current; 
    if (input) {
      const canvas = await html2canvas(input, { scale: 2 }); 
      const imgData = canvas.toDataURL("image/png"); 

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("final_result.pdf");
    }
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
          {/* <FinalResultTable reportData={reportData}/> */}
          <div ref={tableRef}>
              <FinalResultTable reportData={reportData} />
          </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Report