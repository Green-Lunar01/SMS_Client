import React from "react";

function AssessmentTable({ tableData }) {
  if (!tableData || tableData.length === 0) {
    return (
      <section className="w-full h-auto flex flex-col justify-center items-center">
         <table className="table mt-3 min-w-[770px]">
        <thead>
          <tr className="w-full border-0 border-t-[1px] bg-[#f7f7f7]">
            <th className="exam-th w-[23%] pl-[13px]">Subject</th>
            <th className="exam-th">Session</th>
            <th className="exam-th">Class</th>
            <th className="exam-th">Term</th>
            <th className="exam-th">Total Marks</th>
            <th className="text-center">Obtained</th>
          </tr>
        </thead>
       
      </table>
        <div className="dummyDiv flex flex-col gap-8 my-[60px]">
          <img src="/icons/examdummy.svg" alt="No data" />
          <h1 className="font-normal text-[16px] text-center">
            No Result yet...
          </h1>
        </div>
      </section>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="table mt-3 min-w-[770px]">
        <thead>
          <tr className="w-full border-0 border-t-[1px] bg-[#f7f7f7]">
            <th className="exam-th w-[23%] pl-[13px]">Subject</th>
            <th className="exam-th">Session</th>
            <th className="exam-th">Class</th>
            <th className="exam-th">Term</th>
            <th className="exam-th">Total Marks</th>
            <th className="text-center">Obtained</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr className="border-b border-t-[1px]" key={index}>
              <td className="exam-td w-[50%] pl-[17px]">{row.subject_name}</td>
              <td className="exam-td">{row.session_name}</td>
              <td className="exam-td">{row.class_name}</td>
              <td className="exam-td text-center">
                {row.term}
                {row.term === 1
                  ? "st"
                  : row.term === 2
                  ? "nd"
                  : row.term === 3
                  ? "rd"
                  : "th"}
              </td>
              <td className="exam-td pl-[30px]">{row.total_mark}</td>
              <td className="text-center">{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssessmentTable;
