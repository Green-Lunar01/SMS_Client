import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarActiveButton from './SideBarActiveButton';
import SidebarButton from './SidebarButton';

// Import SVGs as React components
import DashboardIcon from "../icons/dashboard.svg?.react"

import AssignmentsIcon  from '../icons/bassignments.svg?react';
import DasIcon from "../icons/dashboard.svg?react";
import  CalendarIcon  from '../icons/calendar.svg?react';
import  MessageIcon  from '../icons/message2.svg?react';
import  MentoringIcon  from '../icons/mentoring.svg?react';
import  BookIcon  from '../icons/book2.svg?react';
import  QuizIcon  from '../icons/quiz5.svg?react';
import  TestIcon  from '../icons/quiz3.svg?react';
import  ReportIcon  from '../icons/report.svg?react';

const Sidebar = ({showMenu, setShowMenu}) => {
  const navigate = useNavigate();

  const buttons = [
    { name: 'dashboard', title: 'Dashboard', icon: DasIcon, onClick: () => navigate('/dashboard') },
    { name: 'assignments', title: 'Assignments', icon: AssignmentsIcon, onClick: () => navigate('/assignments') },
    { name: 'timetable', title: 'Time Table', icon: CalendarIcon, onClick: () => navigate('/timetable') },
    { name: 'messaging', title: 'Messaging', icon: MessageIcon, onClick: () => navigate('/messaging') },
    { name: 'liveclass', title: 'Live Class', icon: MentoringIcon, onClick: () => navigate('/live-class') },
    { name: 'books', title: 'Books', icon: BookIcon, onClick: () => navigate('/books') },
    { name: 'exams', title: 'Exams', icon: QuizIcon, onClick: () => navigate('/exams') },
    { name: 'class-test', title: 'Class Test', icon: TestIcon, onClick: () => navigate('/class-test') },
    { name: 'report-card', title: 'Report Card', icon: ReportIcon, onClick: () => navigate('/report-card') },
  ];

  return (
    <div className={`relative w-full`}>
      <SideBarActiveButton>
       <div className='fixed w-full md:bg-transparent bg-[#08190E80] h-full md:w-0 md:h-[20px]'>
       <div className={`fixed bg-white md:w-[18%] w-[90%] h-[1117px] md:flex flex-col items-end  border-r`}>
          
          <div className="lg:w-[208px] w-full h-[590px] mt-[46px]">
          <div  className=' lg:hidden flex justify-between items-center my-[15px] px-[9px] '>
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
