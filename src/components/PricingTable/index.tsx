import { useState } from 'react';
import { pricing } from '../../../data';

const PricingTable = () => {
  const [active, setActive] = useState(pricing[0]);

  return (
    <div className="md:px-16 px-5 mb-20">
      <div className="flex items-center justify-between mx-auto md:w-[15%]">
        <button
          type="button"
          onClick={() => setActive(pricing[0])}
          className={`w-[47%] py-2 text-sm rounded-xl border  ${
            active.title === 'termly'
              ? 'bg-primary-light text-white'
              : ' text-secondary-bold opacity-40'
          }`}
        >
          Termly
        </button>
        <button
          type="button"
          onClick={() => setActive(pricing[1])}
          className={`w-[47%] py-2 text-sm rounded-xl border  ${
            active.title === 'yearly'
              ? 'bg-primary-light text-white'
              : ' text-secondary-bold opacity-40'
          }`}
        >
          Yearly
        </button>
      </div>

      <div className="flex justify-end items-end md:pr-16">
        {active.prices.map((data, i) => (
          <div key={i} className="md:w-[20%] w-[25%] rounded-md px-5 py-10 text-center">
            <h1 className="uppercase text-sm md:text-lg font-bold">{data.title}</h1>
            <p className="mt-8 mb-5 text-xs md:text-base">₦{data.amount.toLocaleString()}</p>
            <p className="text-xs md:text-sm opacity-40">{data.caption}</p>
          </div>
        ))}
      </div>

      <table className="table-auto w-full text-left border-collapse text-sm">
        <thead>
          <tr>
            <th className=""></th>
            <th className=""></th>
            <th className=""></th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {active.tableData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-[#f1ffe9]' : 'bg-white'}>
              <td className="px-2 md:px-4 py-2">{row.feature}</td>
              <td className="px-10 md:px-4 py-2">{row.col1 ? <CheckIcon /> : <CrossIcon />}</td>
              <td className="px-10 md:px-4 py-2">{row.col2 ? <CheckIcon /> : <CrossIcon />}</td>
              <td className="px-10 md:px-4 py-2">{row.col3 ? <CheckIcon /> : <CrossIcon />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Check Icon Component
const CheckIcon = () => <span className="text-green-500 font-bold text-xl">✔</span>;

// Cross Icon Component
const CrossIcon = () => <span className="text-red-500 font-bold text-xl">✘</span>;

export default PricingTable;
