import Header from "../components/Header";
import Sidebar from "../components/Sidebar";



function Layout({children, showModal, setShowModal}) {
  return (
    <div className="">
      {
        showModal && <div className='fixed w-screen flex-container h-full bg-[#08190E80] z-50'><div className="lg:w-[35%] w-[75%] bg-[#fff] rounded-[15px] ">
          <div className="flex-container-between border-b px-[32px] py-[24px]">
            <h1 className="font-semibold text-[20px]">Add Comment</h1>
           <button onClick={() => setShowModal(false)}> <img src="/icons/cancel-01.svg"/></button>
          </div>
          <div className="flex-container border-b">
            <textarea className="w-full h-[293px] px-[32px] py-[24px]" placeholder="Enter Comment"></textarea>
          </div>
          <div className="flex-container-between px-[32px] py-[17px] ">
           <div className="flex gap-4">
              <img src="/icons/emoji.svg"/>
              <img src="/icons/gallery.svg"/>
           </div>
           <button type="button" className="w-[54px] h-[37px] rounded-[4px] py-2 px-[17px] flex-container text-center bg-[#D9D9D9]">Send</button>
          </div>
          
          </div>
          
          </div>
      } 
        <Header />
     <div className="md:flex hidden">
     <Sidebar />
     </div>
        {children}
    </div>
  )
}

export default Layout
