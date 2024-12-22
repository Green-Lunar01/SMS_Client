import { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { AppContext } from '../../context/AppContext';

import { navs } from '../../../data';

const MobileHeader = () => {
  const location = useLocation();
  const { setShowNav } = useContext(AppContext);
  const currentPath = location.pathname;

  return (
    <section className="fixed top-0 left-0 w-full h-full z-[1000] bg-white">
      <div className="flex flex-col gap-5 items-start w-full h-full p-5">
        <div className="flex justify-between items-center w-full">
          <Link
            to={`/`}
            onClick={() => setShowNav(false)}
            className="text-primary-light text-3xl font-bold"
          >
            EduSoft
          </Link>

          <button type="button" onClick={() => setShowNav(false)} className="w-8">
            <img src="/close.svg" alt="" />
          </button>
        </div>

        <nav className="flex flex-col items-start gap-8 mt-3 w-full justify-between">
          {navs.map((nav, i) => (
            <Link
              to={nav.path}
              key={i}
              onClick={() => setShowNav(false)}
              className={currentPath === nav.path ? 'text-primary-light' : 'text-secondary-bold'}
            >
              {nav.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-start justify-between mt-3 w-full gap-5">
          <button
            type="button"
            className="border border-primary-light w-full rounded-md text-sm py-4 text-primary-light bg-white"
          >
            Sign in
          </button>
          <button
            type="button"
            className="bg-primary-light text-white w-full rounded-md text-sm py-4"
          >
            Create account
          </button>
        </div>
      </div>
    </section>
  );
};

export default MobileHeader;
