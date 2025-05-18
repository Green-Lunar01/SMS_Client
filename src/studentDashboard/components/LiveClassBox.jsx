import React from 'react'

function LiveClassBox() {
  return (
    <div className='w-full flex justify-start'>
    <div className='md:w-[55%] md:mx-[41px] px-[11px] py-[9px] border border-[#d9d9d9] rounded-[7px]'>

        
      <div className='flex gap-[13px] items-center'>
         <h1 className='w-auto text-white font-normal md:text-[14px] text-[12px] py-[1px] bg-[#FBAE44] px-[11px] rounded-[13px]'>Invitation</h1>
         <h1 className='w-auto text-white font-normal md:text-[14px] text-[12px] py-[1px] bg-[#8E98A8] px-[11px] rounded-[13px]'>Meeting with: All teacher</h1>
         
      </div>
      <div className='mt-[24px] flex items-center justify-between'>
         <div className='flex md:gap-[17px] gap-1'>
             <div className='flex items-center gap-[6px]'>
                 <img src='/icons/calendar4.svg'/>
                 <p className='font-normal md:text-[12px] text-[9px]'>Sunday Sep 22nd, 2024</p>
             </div>
             <div className='flex items-center gap-[6px]'>
                 <img src='/icons/clock.svg'/>
                 <p className='font-normal md:text-[12px] text-[9px]'>07:50 PM Duration: 1 hour 30 min</p>
             </div>
         </div>
         <p className='font-normal md:text-[12px] text-[8px] text-[#13A541] '>Active</p>
      </div>
      <p className='class-code font-semibold text-[14px] mt-2 text-[#13A541]'>
      ESK5110BR1rYDj
      </p>
      <div className=' flex justify-between items-center'>
         <div className='md:w-[60%] w-[75%]'>
             <p className='text-[#08190E] md:text-[12px] font-semibold'>Some Text</p>
             <p className='text-[#08190E] md:text-[12px] text-[11px] font-normal'>Lorem ipsum dolor sit amet consectetur. Gravida tempus congue donec nisi risus consectetur proin volutpat sit.</p>
         </div>
         <div>
             <button className='flex items-center gap-[7px] text-white bg-[#13A541] rounded-[10px] py-[7px] px-[7px]'>
                 <img className='w-[20px]' src='/icons/pc.svg'/>
                 <p className='text-[8px] md:text-[12px]'>Join Room</p>
             </button>
         </div>
      </div>
    </div>
 </div>
  )
}

export default LiveClassBox