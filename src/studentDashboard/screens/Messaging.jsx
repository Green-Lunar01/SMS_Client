import React from 'react'
import { useState } from 'react';
import Sendermsg from '../components/messages/Sendermsg';
import Receivermsg from '../components/messages/Receivermsg';

const Messaging = () => {
  const [currentMsg, setCurrentMsg] = useState('All Messages');
  const msgtype = ["All Messages", "Sent Messages", "Received Messages"];

  const handleMsg = () => {
    setCurrentMsg('sender-message');
  }
  return (
    <div className='bg-[#fdfdfd]'>
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[24px] justify-start p-0   my-[15px]'>
        <div className='lg:w-full py-[9px] flex bg-white   lg:flex-row items-center flex-col   gap-[16px]'> 
          <h1 className='w-full text-[#08190E] text-center font-bold text-[24px]'>
            Messaging
          </h1>
          

          
          
        </div>
       
        <section className='w-full bg-[#fdfdfd]  flex flex-col md:flex-row justify-between  '>
          <div className='dummyDiv h-auto mb-[40px] border-[1px] bg-[#fff] border-[#d9d9d9]  lg:w-[34%] px-[23px]  pt-[38px] flex flex-col justify-start gap-[34px] rounded-[9px]'>
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
                   
                    <textarea className=' w-full h-[200px] border-[1px] border-[#f9f9f9] px-[15px] pt-[15px] rounded-[6px]' type='text' placeholder='Write you message' ></textarea>
                    <div>
                        <p> 244 Characters</p>
                        <img src=''/>
                    </div>
                    <div className='pt-[24px]  '>
                      <button type='submit' className='bg-[#13A541] text-center text-white py-[10px] px-[30px] rounded-[10px] mb-10'> Send Message</button>
                     </div>
                </div>
            </div>
            
          </div>
          <div className='lg:w-[62%] bg-[#fff] dummyDiv flex flex-col gap-8  '>
            <div className='w-full border-b border-[#d9d9d9]  bg-[#f9f9f9]'> 
              <div className='w-[62%] flex justify-between md:ml-[25px] ml-[13px] my-[12px] gap-3  '>
                {
                  msgtype.map((msg, index) => <button
                  onClick={() => setCurrentMsg(msg)}
                  className={`w-auto px-[10px] h-[43px] ${
                    currentMsg === msg ? "bg-[#13a541] border-0 text-white" : "text-[#8E98A8] bg-[#fff] border border-[#d9d9d9]"
                  } text-[12px] font-normal`}
                >
                  {msg}
                </button>
                )
                }
                
                
               

              </div>
              
            </div>
            <div className='w-full flex justify-start'>
             
              {
               currentMsg === "All Messages" && <Sendermsg />
              }
              {
               currentMsg === "Sent Messages" && <Sendermsg />
              }
            </div>
            <div className='w-full flex justify-end '>
              {
               currentMsg === "All Messages" && <Receivermsg />
              }
              {
               currentMsg === "Received Messages" && <div>
                <Receivermsg />
               </div>
              }
            </div>
          </div>
        </section> 
      </div>
    </div>
  </div>
  )
}

export default Messaging;