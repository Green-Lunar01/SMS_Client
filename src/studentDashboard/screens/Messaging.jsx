import React, { useEffect } from "react";
import { useState } from "react";
import Sendermsg from "../components/messages/Sendermsg";
import Receivermsg from "../components/messages/Receivermsg";
import { useStudAuth } from "../Auth/context/StudentAuthProvider";
import "./css/Message.css"
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Messaging = () => {
  const [currentMsg, setCurrentMsg] = useState("All Messages");
  const [loading, setLoading] = useState(false)
  const {
    getAllMsg,
    studentProfile,
    setAllMsg,
    allMsg,
    getStudents,
    allTeachers,
    messages,
    getTeachers,
    getMessages,
    sendMessage,
  } = useStudAuth();
  const msgtype = ["All Messages", "Sent Messages", "Received Messages"];


  useEffect(() => {
    async function fetchData() {
      await getMessages();
      await getTeachers();
      setLoading(false);
    }
    fetchData();
  }, []);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  const [messageTo, setMessageTo] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [teacherId, setTeacherId] = useState();
  const [selectedTeacherID, setSelectedTeacherID] = useState();
  const filterMessages = (messages) => {
    return messages?.filter((msg) => msg.sender_role === "student") || [];
  };
  const studentMessages = filterMessages(messages);
  const filterReceivedMessages = (msg) => {
    return messages?.filter((msg) => msg.sender_role !== "student");
  };
  const receivedMsg = filterReceivedMessages(messages);
  console.log("Students Messages:", studentMessages);
  const adminSchema = {
    recipientId: parseInt(studentProfile.user.school_id, 10),
    recipientRole: "admin",
    classId: undefined,
    message: messageBody,
  };

  const teacherSchema = {
    recipientId: parseInt(selectedTeacherID, 10),
    recipientRole: "teacher",
    classId: undefined,
    message: messageBody,
  };
  const [newMessageId, setNewMessageId] = useState(null);
  const handleSendMessage = () => {
    let schema;
    if (messageTo === "admin") {
      schema = adminSchema;
    } else if (messageTo === "specific teacher") {
      schema = teacherSchema;
    }
    sendMessage(schema);
    setNewMessageId(Date.now());
   
  };

  const formatDateTime = (isoString) => {
    const dateObj = new Date(isoString);
    const time = dateObj.toLocaleTimeString(); // Format: 3:14:56 PM
    const date = dateObj.toLocaleDateString(); // Format: 3/19/2025
    return `${date}`; // Time first, then date
  };
  return (
    <div className="bg-[#fdfdfd]">
      <div className="w-full flex justify-center">
        <div className="lg:w-[93%] w-[85%] flex flex-col  gap-[24px] justify-start p-0   my-[15px]">
          <div className="lg:w-full py-[9px] flex bg-white   lg:flex-row items-center flex-col   gap-[16px]">
            <h1 className="w-full text-[#08190E] text-center font-bold text-[24px]">
              Messaging
            </h1>
          </div>

          <section className="w-full bg-[#fdfdfd]  flex flex-col md:flex-row justify-between  ">
            <div className="dummyDiv h-auto mb-[40px] border-[1px] bg-[#fff] border-[#d9d9d9]  lg:w-[34%] px-[23px]  pt-[38px] flex flex-col justify-start gap-[34px] rounded-[9px]">
              <div className="w-full flex flex-col items-center  gap-[13px]">
                <div className="w-full flex flex-col items-center gap-[23px] ">
                  <div className="w-11/12 flex flex-col gap-[23px] ">
                    <h1 className="w-full font-semibold text-[20px]  text-center">
                      Write A New Message
                    </h1>
                    <div className="w-full flex flex-col gap-[10px]">
                      <h1 className="font-semibold text-[14px]">
                        Send Message To*
                      </h1>

                      <select
                        className="px-[27px] py-[18px] border-[1px] border-[#f9f9f9] rounded-[6px] text-[14px] font-normal"
                        placeholder="Select receiver"
                        name="messageTo"
                        id="messageTo"
                        onChange={(e) => setMessageTo(e.target.value)}
                      >
                        <option value="">Select Recipient</option>
                        <option value="admin">School Admin</option>
                        <option value="specific teacher">
                          Specific Teacher
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center gap-[23px] ">
                  <CSSTransition
                    in={messageTo === "specific teacher"}
                    timeout={300}
                    classNames="dropdown"
                    unmountOnExit
                  >
                    <div className="w-11/12 flex flex-col gap-2.5">
                      <label
                        className="font-semibold text-sm"
                        htmlFor="specificTeacher"
                      >
                        Select Teacher
                      </label>
                      <select
                        className="w-full px-6 py-4 border border-gray-300 rounded-md text-sm font-normal outline-none"
                        name="specificTeacher"
                        id="specificTeacher"
                        onChange={(e) => setSelectedTeacherID(e.target.value)}
                      >
                        <option value="">Select Teacher</option>
                        {allTeachers?.map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.teacher_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </CSSTransition>
                </div>
                <div className="w-11/12">
                  <textarea
                    className=" w-full h-[200px] border-[1px] border-[#f9f9f9] px-[15px] pt-[15px] rounded-[6px]"
                    type="text"
                    placeholder="Write you message"
                    onChange={(e) => setMessageBody(e.target.value)}
                  ></textarea>
                  <div>
                    <p> 244 Characters</p>
                    <img src="" />
                  </div>
                  <div className="pt-[24px]  ">
                    <button
                      type="submit"
                      className="bg-[#13A541] text-center text-white py-[10px] px-[30px] rounded-[10px] mb-10"
                      onClick={handleSendMessage}
                    >
                      {" "}
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[62%] bg-[#fff] dummyDiv flex flex-col overflow-y-auto max-h-[600px]   ">
              <div className="w-full border-b border-[#d9d9d9]  bg-[#f9f9f9]">
                <div className="w-[62%] flex justify-between md:ml-[25px] ml-[13px] my-[12px] gap-3  ">
                  {msgtype.map((msg, index) => (
                    <button
                      onClick={() => setCurrentMsg(msg)}
                      className={`w-auto px-[10px] h-[43px] ${
                        currentMsg === msg
                          ? "bg-[#13a541] border-0 text-white"
                          : "text-[#8E98A8] bg-[#fff] border border-[#d9d9d9]"
                      } text-[12px] font-normal`}
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>

              <div  className="w-full flex flex-col justify-start ">
                {currentMsg === "All Messages" &&
                  messages.map((msg, index) => {
                    
                    return msg.sender_role === "teacher" ||
                      msg.sender_role === "admin" ? (

                      <Receivermsg  date={formatDateTime(msg.sent_at)} sender={msg.sender_name} msg={msg.message} />
                    ) : (
                      <div className=" ">
                       
                        <Sendermsg 
                         date={formatDateTime(msg.sent_at)}
                        recipient={msg.recipient_name}
                        msg={msg.message}
                      />
                      </div>
                    );
                  })}
              </div>
              <div className="w-full flex flex-col justify-start ">
                {currentMsg === "Received Messages" &&
                  receivedMsg.map((msg, index) => {
                    return (
                      <Receivermsg  date={formatDateTime(msg.sent_at)}  msg={msg.message} sender={msg.sender_name} />
                    );
                  })}
              </div>
              <div className="w-full flex flex-col justify-start ">
                {currentMsg === "Sent Messages" &&
                  studentMessages.map((msg, index) => {
                    return (
                      <Sendermsg
                         key={msg.id || index}
                         date={formatDateTime(msg.sent_at)}
                        animate={newMessageId === msg.id}
                        recipient={msg.recipient_name}
                        msg={msg.message}
                      />
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
