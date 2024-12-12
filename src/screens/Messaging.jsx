import React from 'react'

const Messaging = () => {
  return (
    <div className=''>
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[24px] justify-start p-0 bg-white  my-[15px]'>
        <div className='lg:w-full  lg:flex-row flex flex-col   gap-[16px]'> 
          <h1 className='w-full text-[#08190E] text-center font-bold text-[24px]'>
            Messaging
          </h1>
          

          
          
        </div>
       
        <section className='w-full   flex justify-between items-center '>
          <div className='dummyDiv h-[700px] border-[1px] border-[#d9d9d9]  lg:w-[35%] px-[23px]  pt-[38px] flex flex-col justify-start gap-[34px] rounded-[9px]'>
            <div className='w-full flex flex-col items-center  gap-[33px]'>
                <div className='w-11/12 flex flex-col items-center gap-[23px] '>
                       <div className='w-11/12 flex flex-col gap-[23px] '>
                            <h1 className='w-full font-semibold text-[20px]  text-center'>
                                Write A New Message
                                </h1>
                                <div className='w-full flex flex-col gap-[10px]'>
                                    <h1 className='font-semibold text-[14px]'>
                                        Send Message To*
                                    </h1>
                                    <input className='px-[27px] py-[18px] border-[1px] border-[#f9f9f9] rounded-[6px] text-[14px] font-normal' placeholder='Select receiver' />
                                </div>
                       </div>
                </div>
                <div className='w-11/12'>
                    {/* <input className=' w-full h-[200px] border-[1px] border-[#f9f9f9] px-[20px] py-[10px] rounded-[6px]' type='text' placeholder='Write you message' /> */}
                    <textarea className=' w-full h-[200px] border-[1px] border-[#f9f9f9] px-[15px] pt-[15px] rounded-[6px]' type='text' placeholder='Write you message' ></textarea>
                    <div>
                        <p> 244 Characters</p>
                        <img src=''/>
                    </div>
                    <div className='pt-[24px]  '>
                      <button type='submit' className='bg-[#13A541] text-center text-white py-[10px] px-[30px] rounded-[10px]'> Send Message</button>
                     </div>
                </div>
            </div>
            
          </div>
          <div className='lg:w-7/12 dummyDiv flex flex-col gap-8  '>
             <img src='/icons/dummy.svg'/>
             <h1 className='font-normal text-[16px] text-center'>
              No Messages yet
             </h1>
          </div>
        </section>
      </div>
    </div>
  </div>
  )
}

export default Messaging;