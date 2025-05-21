import React from "react";
import "./css/msg.css"
function Receivermsg({date, msg, sender }) {
  return (
    <div
      id="msg-animate"
      className=" flex flex-col gap-[10px] mx-[17px] mt-4 receiver"
    >
      <h1 className="font-semibold text-[14px] text-[#08190E]">{date}</h1>
      <div className="flex flex-col   px-[20px] bg-[#F9F9F9] h-auto  py-[10px]">
        <div id="msg-animate" className=" flex flex-col gap-[10px] ">
          <h1 className="w-full text-[#08190E] font-bold text-[12px]">
            From {sender}
          </h1>
          <div className="relative w-full flex justify-center gap-4 items-start ">
            <img className="w-[28px]" src="/icons/admin.svg" />
            <p className="w-full font-normal text-[14px]  mb-3">{msg}</p>
            <img
              className="absolute -bottom-1 -right-3"
              src="/icons/tick.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receivermsg;
