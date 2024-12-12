// import { Chart } from 'chart.js'
import React, { useState } from 'react'

const Books = () => {
    const bookLibrary = [
        {
            "bookCategory": "Mathematics",
            "books": []
        },
        {
            "bookCategory": "English Language",
            "books": []
        },
        {
            "bookCategory": "Biology",
            "books": []
        },
        {
            "bookCategory": "Chemistry",
            "books": []
        },
        {
            "bookCategory": "Economics",
            "books": []
        },
        {
            "bookCategory": "Physics",
            "books": []
        },
        {
            "bookCategory": "Basic Science",
            "books": []
        },
        {
            "bookCategory": "Social Studies",
            "books": []
        },
        {
            "bookCategory": "Arts & Craft",
            "books": []
        },
        {
            "bookCategory": "Verbal Aptitude",
            "books": []
        },
      ]
    const defaultCategory = bookLibrary[0].bookCategory
  const [category, setCategory] = useState(defaultCategory)
  
  const handleSetCategory =(selectedCategory) =>{
    setCategory(selectedCategory)
    console.log("category: ", category)
  }
 
  return (
<div className='bg-[#fdfdfd]'>
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[48px] justify-start p-0 bg-white  my-[15px]'>
        <div className='lg:w-full  lg:flex-row flex flex-col   gap-[16px]'> 
          <h1 className='w-full text-[#08190E] text-center font-bold text-[24px]'>
            Books
          </h1>
          

          
          
        </div>
        <section className='w-full flex justify-start  gap-[16px] '> 
        
        <div className='w-full flex justify-center gap-[10px] h-[74px]'>
  {bookLibrary.map((bookCategory) => (
    <button 
      key={bookCategory.bookCategory} 
      onClick={() => handleSetCategory(bookCategory.bookCategory)}
      style={{
        backgroundColor: category === bookCategory.bookCategory ? "#13A541" : "#f9f9f9",
      }}
      className={`text-[10px] w-[150px]  h-[30px] px-[4px] py-[2px] flex items-center rounded-md ${
        category === bookCategory.bookCategory ? "text-white" : "text-black"
      }`}
    >
    <h1 className='w-full'>
        {bookCategory.bookCategory}
    </h1>
    {/* <Chart /> */}
    </button>
  ))}
</div>

        </section>
        <section className='w-full  flex justify-center items-center'>
          <div className='dummyDiv flex flex-col gap-8 mt-[60px]'>
             <img src='/icons/dummy.svg'/>
             <h1 className='font-normal text-[16px] text-center'>
              No Records yet
             </h1>
          </div>
        </section>
      </div>
    </div>
  </div>
  )
}

export default Books