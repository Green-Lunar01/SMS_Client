import { FaComment } from "react-icons/fa6";
import { useStudAuth } from "../Auth/context/StudentAuthProvider";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";


function Layout({ children, showModal, setShowModal }) {
   const {postComment, commentId, allComments} = useStudAuth()
   const [comment, setComment] = useState("")
    useEffect(() => {
      console.log("All commmmmments:", allComments)
      
    }, [comment])



  return (
    <div className="">
      {showModal && (
        <div className="fixed w-screen flex-container h-full bg-[#08190E80] z-50">
          <div className="lg:w-[35%] w-[75%] bg-[#fff] rounded-[15px] ">
            <div className="flex-container-between border-b px-[32px] py-[24px]">
              <h1 className="font-semibold text-[20px]">Add Comment</h1>
              <button onClick={() => setShowModal(false)}>
                {" "}
                <img src="/icons/cancel-01.svg" />
              </button>
            </div>
            <div className="flex-container-col border-b">
              <div className="flex flex-col items-start max-h-[200px] overflow-y-auto scrollbar-none no-scrollbar">
               
              {
                  allComments.map((comment, index) => {
                    return(
                      <div className="w-full mr-2 flex items-center gap-3 h-auto px-[32px] py-[12px]">
                      <div className="rounded-[50%]  flex justify-center items-center w-[40px] h-[40px] bg-[#ff3d3d] flex-shrink-0">
                        <p className="text-white">T</p>
                      </div>
                      <div >
                        <p className= "font-normal text-[14px] ">
                         {comment.comment}
    
                        </p>
                        
    
                      </div>
                      
                      </div>
                      
                    )

                  })
                }
              </div>
             
              <textarea onChange={(e) => {
                   setComment(e.target.value)
              }}
                className="w-full h-[193px] px-[32px] py-[24px]"
                placeholder="Enter Comment"
              ></textarea>
            </div>
            <div className="flex-container-between px-[32px] py-[17px] ">
              <div className="flex gap-4">
                <img src="/icons/emoji.svg" />
                <img src="/icons/gallery.svg" />
              </div>
              <button
                onClick={() => postComment(commentId, comment, setShowModal)}
                type="button"
                className="w-[54px] h-[37px] rounded-[4px] py-2 px-[17px] flex-container text-center bg-[#D9D9D9]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      <Header />
      <div className="md:flex hidden">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}

export default Layout;
