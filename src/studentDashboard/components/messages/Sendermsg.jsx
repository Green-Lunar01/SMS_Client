import React from 'react'

const Sendermsg = () => {
  return (
    <div className=' flex flex-col gap-[10px]  sender mx-[17px]'>
                  <h1 className='font-semibold text-[14px]'>
                     Today
                  </h1>
                  <div className='flex flex-col  items-center px-[10px] bg-[#13A541] h-auto rounded-[11px] py-[10px]'>
                    <div className=' flex flex-col gap-[10px] '>
                      <h1 className='text-white  font-bold text-[12px]'>To Duke Okoro </h1>
                      <div className='relative w-full flex  gap-4 items-start '>
                          <img className='w-[28px]' src='/images/persona.svg'/>
                          <p className='min-w-[50px] font-normal text-[14px] text-white mb-4'>
                           .......
                          </p>
                          <img className='absolute -bottom-1 -right-1' src='/icons/tick3.svg'/>
                      </div>
                     </div>
                  </div>
    </div>
   
  )
}

export default Sendermsg