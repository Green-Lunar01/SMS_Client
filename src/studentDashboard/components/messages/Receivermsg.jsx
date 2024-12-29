import React from 'react'

function Receivermsg() {
  return (
    <div className=' flex flex-col gap-[10px] mx-[17px]  receiver'>
    <h1 className='font-semibold text-[14px] text-[#08190E]'>
       Yesterday
    </h1>
    <div className='flex flex-col  items-center px-[20px] bg-[#F9F9F9] h-auto rounded-[11px] py-[10px]'>
      <div className=' flex flex-col gap-[10px] '>
        <h1 className='w-full text-[#08190E] font-bold text-[12px]'>From Admin</h1>
        <div className='relative w-full flex justify-center gap-4 items-start '>
            <img className='w-[28px]' src='/icons/admin.svg'/>
            <p className='w-full font-normal text-[14px]  mb-3'>
               Lorem ipsum dolor sit amet consectetur. Donec nec a eget facilisis. Et condimentum ultricies sem dui viverra scelerisque. Quisque ligula dui amet gravida habitasse cursus etiam enim integer. Adipiscing diam sed faucibus egestas nunc urna faucibus.
            </p>
            <img className='absolute -bottom-1 -right-3' src='/icons/tick.svg'/>
        </div>
       </div>
    </div>
</div>
  )
}

export default Receivermsg