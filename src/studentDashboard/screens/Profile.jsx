import React from 'react'

const Profile = () => {
  return (
    <div className='relative bg-[#fdfdfd] h-auto'>
      
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[48px] justify-start p-0   my-[40px]'>
        <div className='lg:w-full  lg:flex-row flex flex-col   gap-[16px] bg-white'> 
          <h1 className='w-full py-3 text-[#08190E] text-center font-bold text-[24px] '>
            Update Profile
          </h1>
          

          
          
        </div>
        <div className='flex lg:justify-between flex-col lg:flex-row gap-[100px]'>
            <div className='flex flex-col items-center sm:flex-row sm:items-start lg:w-[50%]   gap-[33px]'>

                <div className='h-[332px] sm:w-[50%] flex flex-col gap-[10px]  items-center justify-center bg-white px-[42px] py-[23.5px] border border-[#d9d9d9] rounded-[5px]'>
                    <div>
                        <img className='w-[153px]' src='/images/person.svg'/>
                    </div>
                    <div>
                        <h1 className='text-[#13A541] text-center font-bold text-[14px]'>Username</h1>
                        <p className='font-normal text-[14px]'>Dallas Terry</p>
                    </div>
                    <div>
                        <h1 className='text-[#13A541] text-center font-bold text-[14px]'>Password</h1>
                        <p className='font-normal text-[14px] text-center'>Dallas Terry's Password</p>
                    </div>
                </div>
                <form className='flex flex-col sm:w-[50%]  '>
                    <label className='font-semibold text-[14px]'> Username</label>
                    <input type='text' placeholder='Enter your name' className='py-[18px] px-[27px] border-[1px] rounded-[6px] border-[#d9d9d9] mt-[10px]'/>
                    <label className='font-semibold text-[14px] mt-[27px]'> Password</label>
                    <input type='password' placeholder='Enter your password' className='py-[18px] px-[27px] border-[1px] rounded-[6px] border-[#d9d9d9] mt-[10px]'/>
                    <div className='flex justify-center'>
                        <button className='  mt-[53px] text-white bg-[#13A541] py-[17px] px-[40px] rounded-[10px]'>
                        Update
                    </button>
                    </div>
                </form>
               

            </div>
            <div className=' lg:w-[25%] border-1 border-[#f7f7f7] shadow-xl rounded-[14px] px-[20px] py-[24px] md:mr-[20px]'>
                <div className='w-full flex flex-col justify-center items-center px-[58px]'>
                    <img className='w-[130px]' src='/images/person.svg'/>
                    <p className='text-center'>Sammy Dach</p>
                </div>
                <div className=' bg-[#FBFBFB] rounded-[9px] mt-[24px] px-[12px] py-[18px]'>
                    <div className=''>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Matric Number</h2>
                        <p className='font-normal text-[14px]'>BD4567890</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Date Of Admission</h2>
                        <p className='font-normal text-[14px]'>22/10/2007</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Class</h2>
                        <p className='font-normal text-[14px]'>J.S.S 2</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Date Of Birth</h2>
                        <p className='font-normal text-[14px]'>10/10/2002</p>
                    </div>
                </div>
                <div className='  rounded-[9px] mt-[24px] px-[18px] py-[18px]'>
                    <div className=''>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Gender</h2>
                        <p className='font-normal text-[14px]'>Male</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Religion</h2>
                        <p className='font-normal text-[14px]'>Christian</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Phone number</h2>
                        <p className='font-normal text-[14px]'>09067255677</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Blood Group</h2>
                        <p className='font-normal text-[14px]'>O+</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Disease</h2>
                        <p className='font-normal text-[14px]'>Asthma</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Orphan</h2>
                        <p className='font-normal text-[14px]'>No</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Previous School</h2>
                        <p className='font-normal text-[14px]'>No</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Address</h2>
                        <p className='font-normal text-[14px]'>5663 VonRueden Lock</p>
                    </div>
                   
                </div>
                <div className='  rounded-[9px] mt-[24px] px-[18px] py-[18px]'>
                    <div className='w-full '>
                        <h2 className='w-full font-semibold text-[16px] border-b border-[#d9d9d9]'>Father/Guardian Info</h2>
                        
                    </div>
                   
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Father’s Full Name</h2>
                        <p className='font-normal text-[14px]'>Leonard Bosco</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Occupation</h2>
                        <p className='font-normal text-[14px]'>Doctor</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Mobile No.</h2>
                        <p className='font-normal text-[14px]'>0907864556</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Education</h2>
                        <p className='font-normal text-[14px]'>BSC</p>
                    </div>
                    
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Address</h2>
                        <p className='font-normal text-[14px]'>5663 VonRueden Lock</p>
                    </div>
                   
                </div>
                <div className='  rounded-[9px] mt-[24px] px-[18px] py-[18px]'>
                    <div className='w-full '>
                        <h2 className='w-full font-semibold text-[16px] border-b border-[#d9d9d9]'>Mother/Guardian Info</h2>
                        
                    </div>
                   
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Religion</h2>
                        <p className='font-normal text-[14px]'>Christian</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Phone number</h2>
                        <p className='font-normal text-[14px]'>09067255677</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Blood Group</h2>
                        <p className='font-normal text-[14px]'>O+</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Disease</h2>
                        <p className='font-normal text-[14px]'>Asthma</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Orphan</h2>
                        <p className='font-normal text-[14px]'>No</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Previous School</h2>
                        <p className='font-normal text-[14px]'>No</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Address</h2>
                        <p className='font-normal text-[14px]'>5663 VonRueden Lock</p>
                    </div>
                   
                </div>

            </div>
        </div>
   
      </div>
    </div>
  </div>
  )
}

export default Profile