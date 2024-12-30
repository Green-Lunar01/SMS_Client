import { useContext } from 'react';
import { Link, useLocation, useNavigate,} from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

import { navs } from '../../../data';

const Header = () => {
  const location = useLocation();
  const { setShowNav } = useContext(AppContext);
  const currentPath = location.pathname;
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center shadow-lg py-2 px-5 lg:px-10">
      <Link to={`/`} className="text-primary-light text-3xl w-[25%] font-bold">
        <img src="/logo.svg" alt="" className='w-[80%] md:w-[30%]' />
      </Link>

      <nav className="hidden lg:flex items-center gap-5 w-[20%] justify-between">
        {navs.map((nav, i) => (
          <Link
            to={nav.path}
            key={i}
            className={currentPath === nav.path ? 'text-primary-light' : 'text-secondary-bold'}
          >
            {nav.title}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex items-center justify-between w-[25%] gap-5">
        <button
          onClick={() => navigate("/login")}
          type="button"
          className="border border-primary-light w-[50%] rounded-md text-sm py-2.5 text-primary-light bg-white"
        >
          Sign in
        </button>
        <button
          type="button"
          className="bg-primary-light text-white w-[50%] rounded-md text-sm py-2.5"
        >
          Create account
        </button>
      </div>

      <button type="button" onClick={() => setShowNav(true)} className="lg:hidden block">
        <img src="/menu.svg" alt="" />
      </button>
    </div>
  );
};

export default Header;
