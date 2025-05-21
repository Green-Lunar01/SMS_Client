import React, { useState, useEffect } from "react";
import "./Assignment.css";
import personImg from "../../../assets/person-img.png";
import calendarImg from "../../../assets/calendar-img.png";
import bookImg from "../../../assets/book-img.png";
import teachImg from "../../../assets/teach-img.png";
import { LiaCommentDots } from "react-icons/lia";
import Modal from "../../../components/Modal/Modal";
import { RiCloseLine } from "react-icons/ri";
import { useTeacherAuth } from "../../../Auth/context/TeacherAuthProvider";
import * as yup from "yup";
import { get, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "../../../components/Spinner/Spinner";
import { data } from "react-router-dom";

const Assignment = () => {
  const {
    getAllClasses,
    allClasses,
    getSubjects,
    allSubjects,
    addAssignment,
    setTeacherID,
    getAssignment,
    teacherID,
    assignments,
    postComment,
    getComments,
    allComments,
    getTeachers,
    allTeachers,
    teacherProfile,
    loading,
  } = useTeacherAuth();

  //   const [teacherId, setTeacherId] = useState("");
  const [commentId, setCommentId] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    getAllClasses();
    getSubjects();
    getTeachers();
    setTeacherID(teacherProfile.user.id);
    console.log("My teach", allTeachers);
  }, []);
  useEffect(() => {
    console.log("Teacher assignent:", assignments);
  }, [assignments]);
  const addAsgtSchema = yup.object().shape({
    class_id: yup.number().required("Enter the class"),
    subject_id: yup.number().required("Enter the subject"),
    // teacher_id: yup.number().required("Set the teacher"),
    details: yup.string().required("Enter the assignment details"),
    date: yup.string().required("Pick a valid date"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addAsgtSchema) });
  const [classID, setClassID] = useState(0);
  const onSubmit = async (data) => {
    const assignmentData = {
      ...data,
      teacher_id: teacherID,
    };

    await addAssignment(assignmentData, setIsModalOpen); // Ensure it completes
    getAssignment(classID, date);
    console.log(data);
  };

  const [id, setId] = useState();

  const [date, setDate] = useState("");

  //   const [teacherID, setTeacherID] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }); // Full month name
    const year = date.getFullYear();

    return { day, month, year };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModal2Open, setIsModal2Open] = useState(false);

  const openModal2 = () => {
    setIsModal2Open(true);
  };
  const closeModal2 = () => {
    setIsModal2Open(false);
  };
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  return (
    <div className="assignment-screen">
      <h2>Assignment</h2>
      <aside>
        <article>
          <div>
            <label htmlFor="date">Homework Date *</label>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name="date"
              id="date"
              value={date}
            />
          </div>

          <div>
            <label htmlFor="class">Class *</label>
            <select
              name="class"
              id="class"
              onChange={(e) => setClassID(e.target.value)}
            >
              <option value="0">Select Class</option>
              {allClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class_name}
                </option>
              ))}
            </select>
          </div>

          {/* <div>
					<label htmlFor="teacher">Teacher *</label>
					<select name="teacher" id="teacher" onChange={(e) => setTeacherID(e.target.value)}>
					<option value="0">Select Teacher</option>
					{allTeachers.map((cls) => (
						<option key={cls.id} value={cls.id}>{cls.teacher_name}</option>
					))}
					</select>
				</div> */}

          <button
            onClick={() => {
              getAssignment(classID, date);
            }}
            className="primary-btn"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-t-2 rounded-full border-t-green-500 border-gray-700 animate-spin mx-4 my-[2px]"></div>
            ) : (
              "Search"
            )}
          </button>
          <button onClick={() => setIsModalOpen(true)}>Add Assignment</button>
        </article>
      </aside>

      <main>
        {assignments?.map((assignment, index) => {
          const { day, month, year } = formatDate(assignment.date);
          return (
            // <p>hi</p>
            <article>
              <div className="top">
                <div style={{ backgroundColor: "#F3FEF7" }}>
                  <img src={personImg} alt="" />
                  <span>
                    <h6>{assignment.teacher_name}</h6>
                    <p>Teacher</p>
                  </span>
                </div>
                <div style={{ backgroundColor: "#E9EFFF" }}>
                  <img src={bookImg} alt="" />
                  <span>
                    <h6>{assignment.subject_name}</h6>
                    <p>Subject</p>
                  </span>
                </div>
                <div style={{ backgroundColor: "#FFF5EF" }}>
                  <img src={teachImg} alt="" />
                  <span>
                    <h6>{assignment.class_name}</h6>
                    <p>Class</p>
                  </span>
                </div>
                <div style={{ backgroundColor: "#E6E6E6" }}>
                  <img src={calendarImg} alt="" />

                  <span>
                    <h6>{day}</h6>
                    <p>
                      {month} {year}
                    </p>
                  </span>
                </div>

                <span
                  onClick={() => {
                    setIsModal2Open(true);
                    getComments(assignment.id);
                    setCommentId(assignment.id);
                  }}
                >
                  <LiaCommentDots />
                  <p>Add Comments</p>
                </span>
              </div>
              <div className="bottom">
                <h4>Assignment</h4>
                <p>{assignment.details}</p>
              </div>
            </article>
          );
        })}
       
        {(!assignments || assignments.length === 0) && (
          <section className="w-full h-auto  flex justify-center items-center">
            <div className="dummyDiv flex flex-col gap-8 my-[60px]">
              <img src="/icons/dummy.svg" />
              <h1 className="font-normal text-[16px] text-center">
                Search for an assignment...
              </h1>
            </div>
          </section>
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="add-assignment-modal">
          <aside>
            <h3>Add Assignment</h3>
            <RiCloseLine onClick={closeModal} />
          </aside>
          <form
            onSubmit={handleSubmit((data) => {
              console.log("Form Data:", data);
              onSubmit(data);
            })}
          >
            <article>
              <div className="form-group">
                <label htmlFor="date">Homework Date *</label>
                <input type="date" {...register("date")} />
                <p>{errors.date?.message}</p>
              </div>

              {/* <div className="form-group">
                <label htmlFor="setBy">Set By *</label>
                <select
                  {...register("teacher_id")}
                  onChange={(e) => setTeacherId(e.target.value)}
                >
                  <option value="">Select Teacher</option>
                  {allTeachers.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.teacher_name}
                    </option>
                  ))}
                </select>
                <p>{errors.teacher_id?.message}</p>
              </div> */}

              <div className="form-group">
                <label htmlFor="class">Class *</label>
                <select {...register("class_id")}>
                  <option value="">Select Class</option>
                  {allClasses.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.class_name}
                    </option>
                  ))}
                </select>
                <p>{errors.class_id?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select {...register("subject_id")}>
                  <option value="">Select Subject</option>
                  {allSubjects.map((subj) => (
                    <option key={subj.id} value={subj.id}>
                      {subj.subject_name}
                    </option>
                  ))}
                </select>
                <p>{errors.subject_id?.message}</p>
              </div>
            </article>

            <section>
              <div className="form-group details">
                <label htmlFor="details">Details *</label>
                <textarea
                  {...register("details")}
                  cols="30"
                  rows="10"
                  placeholder="Enter assignment details"
                ></textarea>
                <p>{errors.details?.message}</p>
              </div>

              <button type="submit" className="primary-btn">
                Add Assignment
              </button>
            </section>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isModal2Open} onClose={closeModal2}>
        <div className="add-comment-modal">
          <aside>
            <h3>Add Comment</h3>
            <RiCloseLine onClick={closeModal2} />
          </aside>

          <main>
            <div className="flex flex-col items-start max-h-[200px] overflow-y-auto scrollbar-none no-scrollbar">
              {isModal2Open && allComments?.map((comment, index) => {
                return (
                  <div className="w-full mr-2 flex items-center gap-3 h-auto  py-[12px]">
                    <div className="rounded-[50%]  flex justify-center items-center w-[40px] h-[40px] bg-[#ff3d3d] flex-shrink-0">
                      <p className="text-white">T</p>
                    </div>
                    <div className="w-[90%]">
                      <p className="font-normal text-[14px] break-words ">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <textarea
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="w-full h-[203px]  py-[12px]"
              placeholder="Enter Comment"
            ></textarea>
          </main>
          <aside className="border-2 border-t-2 rounded-[10px]">
            <div className="flex gap-4">
              <img src="/icons/emoji.svg" />
              <img src="/icons/gallery.svg" />
            </div>
            <button
              type="button"
              onClick={() => postComment(commentId, comment, setIsModal2Open)}
              className={`w-[54px] h-[37px] rounded-[4px] py-2 px-[17px] flex-container text-center ${
                comment ? "bg-green-500 text-white" : "bg-[#D9D9D9]"
              }`}
            >
              Send
            </button>
          </aside>
        </div>
      </Modal>
    </div>
  );
};

export default Assignment;
