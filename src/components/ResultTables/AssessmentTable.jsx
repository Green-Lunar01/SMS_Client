import React from 'react'

function AssessmentTable({tableData}) {
  return (
    <table className="table mt-3">
    <thead>
      <tr className="w-full border-0 border-t-[1px] bg-[#f7f7f7]">
        <th className="exam-th w-[23%] pl-[13px]">Subject</th> {/* Adjusted width */}
        <th className="exam-th">Session</th>
        <th className="exam-th">Class</th>
        <th className="exam-th">Term</th>
        <th className="exam-th">Total Marks</th>
        <th className=" text-center">Obtained</th>
      </tr>
    </thead>
    <tbody>
      {tableData.map((row, index) => (
        <tr className="border-b border-t-[1px]" key={index}>
          <td className="exam-td w-[50%] pl-[17px] ">{row.subject}</td> {/* Adjusted width */}
          <td className="exam-td">{row.session}</td>
          <td className="exam-td">{row.class}</td>
          <td className="exam-td">{row.term}</td>
          <td className="exam-td pl-[30px]">{row.totalMarks}</td>
          <td className="text-center" >{row.marksObtained}</td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default AssessmentTable