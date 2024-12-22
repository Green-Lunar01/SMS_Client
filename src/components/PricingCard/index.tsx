import { useState } from 'react';
import { pricing } from '../../../data';

const PricingCard = ({ isPage = false }) => {
  const [active, setActive] = useState(pricing[0]);

  return (
    <div className="md:py-10 p-5 md:px-16 my-10 text-center">
      {!isPage && (
        <>
          <h1 className="text-3xl text-primary-light font-semibold">Pricing</h1>

          <p className="my-5">Create a plan according to the requirements of your school.</p>
        </>
      )}

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

      {/* ----- price cards */}
      <div className="flex flex-col lg:flex-row justify-center gap-14 items-center mt-10">
        {active.prices.map((data, i) => (
          <div
            key={i}
            className="lg:w-[23%] border shadow-md rounded-md px-5 py-10 text-center hover:scale-110 duration-500 transition-all"
          >
            <h1 className="uppercase text-lg font-bold">{data.title}</h1>
            <p className="mt-8 mb-5">₦{data.amount.toLocaleString()}</p>
            <p className="text-sm opacity-40">{data.caption}</p>
            <ul className="mt-10 pl-5 text-left text-xs flex flex-col gap-3">
              {data.more.map((more, i) => (
                <li key={i} className="flex items-center gap-4">
                  <img src="/checkmark.svg" alt="" />
                  {more}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="py-2.5 text-sm bg-primary-light text-white rounded-md w-full mt-10"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
