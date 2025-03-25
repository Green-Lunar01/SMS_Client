import React, { useState, useEffect } from "react";
import "./Messaging.css";
import noMessages from "../../../assets/no-messages.png";
import { useTeacherAuth } from "../../../Auth/context/TeacherAuthProvider";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Messaging = () => {
  const {
    allStudents,
    allClasses,
    getStudents,
    sendMessage,
    teacherProfile,
    messages,
    getMessages,
  } = useTeacherAuth();
  const [messageTo, setMessageTo] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [viewTab, setViewTab] = useState("all");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedClsID, setSelectedClsID] = useState();
  const [selectedStudentID, setSelectedStudentID] = useState();
  const sender =
    teacherProfile.user.surname + " " + teacherProfile.user.first_name;
  useEffect(() => {
    getStudents();
    getMessages();
    const sender =
      teacherProfile.user.surname + " " + teacherProfile.user.first_name;
   
  }, []);

  const studentSchema = {
    recipientId: parseInt(selectedStudentID, 10),
    recipientRole: "student",
    classId: undefined,
    message: messageBody,
  };

  const classSchema = {
    recipientId: undefined,
    recipientRole: "class",
    classId: parseInt(selectedClsID),
    message: messageBody,
  };

  const adminSchema = {
    recipientId: parseInt(teacherProfile.user.school_id, 10),
    recipientRole: "admin",
    classId: undefined,
    message: messageBody,
  };

  console.log(
    "Student Message schema:",
    studentSchema,
    "hi messages:",
    messages
  );

 

  const filterMessages = (messages, viewTab) => {
	return messages.filter((message) => {
	  if (viewTab === "all") return true; 
	  if (viewTab === "sent" && message.sender_name === sender) return true; 
	  if (viewTab === "recieved" && message.sender_name !== sender) return true; 
	  return false;
	});
  };
  

  useEffect(() => {
    setFilteredMessages(filterMessages(messages, viewTab));
  }, [viewTab, messages]);

  const handleSendMessage = () => {
    let schema;
    if (messageTo === "students") {
      schema = studentSchema;
    } else if (messageTo === "admin") {
      schema = adminSchema;
    } else if (messageTo === "specific class") {
      schema = classSchema;
    }
    sendMessage(schema);
  };
  const formatDateTime = (isoString) => {
    const dateObj = new Date(isoString);
    const time = dateObj.toLocaleTimeString(); // Format: 3:14:56 PM
    const date = dateObj.toLocaleDateString(); // Format: 3/19/2025
    return `${date}`; // Time first, then date
  };
  return (
    <div className="messaging-screen">
      <h2>Messaging</h2>
      <section>
        <aside>
          <h3>Write a New Message</h3>

          <div className="form-group">
            <label htmlFor="messageTo">Send Message To*</label>
            <select
              name="messageTo"
              id="messageTo"
              onChange={(e) => setMessageTo(e.target.value)}
            >
              <option value="">Select Recipient</option>
              <option value="admin">School Admin</option>
              <option value="specific class">Specific Class</option>
              <option value="students">Specific Students</option>
            </select>
          </div>

          <SwitchTransition mode="out-in">
            <CSSTransition
              key={messageTo}
              timeout={300}
              classNames="dropdown"
              unmountOnExit
            >
              <div>
                {messageTo === "specific class" && (
                  <div className="form-group">
                    <label htmlFor="specificClass">Select Class</label>
                    <select
                      name="specificClass"
                      id="specificClass"
                      onChange={(e) => setSelectedClsID(e.target.value)}
                    >
                      <option value="">Select Class</option>
                      {allClasses.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.class_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {messageTo === "students" && (
                  <div className="form-group">
                    <label htmlFor="specificStudent">Select Student</label>
                    <select
                      name="specificStudent"
                      id="specificStudent"
                      onChange={(e) => setSelectedStudentID(e.target.value)}
                    >
                      <option value="">Select Student</option>
                      {allStudents.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.teacher_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>

          <textarea
            name="messageBody"
            id="messageBody"
            placeholder="Write your message here"
            maxLength={500}
            onChange={(e) => setMessageBody(e.target.value)}
          ></textarea>

          <button onClick={handleSendMessage} className="primary-btn">
            Send Message
          </button>
        </aside>

        <main>
          <div className="select-tab">
            <button
              className={viewTab === "all" ? "active" : ""}
              onClick={() => setViewTab("all")}
            >
              All Messages
            </button>
            <button
              className={viewTab === "sent" ? "active" : ""}
              onClick={() => setViewTab("sent")}
            >
              Sent Messages
            </button>
            <button
              className={viewTab === "recieved" ? "active" : ""}
              onClick={() => setViewTab("recieved")}
            >
              Received Messages
            </button>
          </div>
          <div className="messages-area">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div
                  className={
                    message.sender_name !== sender
                      ? "message-block"
                      : "message-block sent"
                  }
                  key={message.id}
                >
                  <h3>{formatDateTime(message.sent_at)}</h3>
                  <main>
                    <h6>
                      {message.sender_name !== sender
                        ? `From ${message.sender_name}`
                        : `To ${message.recipient_name}`}
                    </h6>
                    <p>{message.message}</p>
                  </main>
                </div>
              ))
            ) : (
              <div className="no-messages">
                <img src={noMessages} alt="no messages" />
                <p>No Messages</p>
              </div>
            )}
          </div>
          
        </main>
      </section>
    </div>
  );
};

export default Messaging;
