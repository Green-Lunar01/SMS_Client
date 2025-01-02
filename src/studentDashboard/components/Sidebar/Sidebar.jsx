import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarActiveButton from '../SideBarActiveButton';
import SidebarButton from '../SidebarButton';

import './Sidebar.css'
import AssignmentsIcon  from '../../../studentDashboard/icons/bassignments.svg?react';
import DasIcon from "../../../studentDashboard/icons/dashboard.svg?react";
import  CalendarIcon  from '../../../studentDashboard/icons/calendar.svg?react';
import  MessageIcon  from '../../../studentDashboard/icons/message2.svg?react';
import  MentoringIcon  from '../../../studentDashboard/icons/mentoring.svg?react';
import  BookIcon  from '../../../studentDashboard/icons/book2.svg?react';
import  QuizIcon  from '../../../studentDashboard/icons/quiz5.svg?react';
import  TestIcon  from '../../../studentDashboard/icons/quiz3.svg?react';
import  ReportIcon  from '../../../studentDashboard/icons/report.svg?react';

const Sidebar = ({showMenu, setShowMenu}) => {
  const navigate = useNavigate();

  const buttons = [
    { name: 'dashboard', title: 'Dashboard', icon: DasIcon, onClick: () => (navigate('/student/dashboard')) },
    { name: 'assignments', title: 'Assignments', icon: AssignmentsIcon, onClick: () => (navigate('/student/assignments')),  },
    { name: 'timetable', title: 'Time Table', icon: CalendarIcon, onClick: () => navigate('/student/timetable') },
    { name: 'messaging', title: 'Messaging', icon: MessageIcon, onClick: () => navigate('/student/messaging') },
    { name: 'live-class', title: 'Live Class', icon: MentoringIcon, onClick: () => navigate('/student/live-class') },
    { name: 'books', title: 'Books', icon: BookIcon, onClick: () => navigate('/student/books') },
    { name: 'exams', title: 'Exams', icon: QuizIcon, onClick: () => navigate('/student/exams') },
    { name: 'class-test', title: 'Class Test', icon: TestIcon, onClick: () => navigate('/student/class-test') },
    { name: 'report-card', title: 'Report Card', icon: ReportIcon, onClick: () => navigate('/student/report-card') },
  ];

  return (
    <div className={`relative w-full`}>
      <SideBarActiveButton>
       <div className='fixed w-full md:bg-transparent bg-[#08190E80] h-full md:w-0 md:h-[20px] '>
       <div className={`fixed bg-white md:w-[18%] sm:w-[60%] w-[90%] h-[1117px] md:flex flex-col items-end  border-r `}>
          
          <div className="lg:w-[208px] w-full h-[590px] mt-[46px]">
          <div  className=' md:hidden flex justify-between items-center my-[15px] px-[9px] '>
             <div>Menu</div>
             <button onClick={() => setShowMenu(false)}><img src="/icons/cancel-01.svg" /></button>
          </div>
            {buttons.map((button) => (
              <SidebarButton
                key={button.name}
                name={button.name}
                title={button.title}
                icon={button.icon}
                onClick={button.onClick}
                setShowMenu={setShowMenu}
              />
            ))}
          </div>
        </div>
       </div>
      </SideBarActiveButton>
    </div>
  );
};

export default Sidebar;
