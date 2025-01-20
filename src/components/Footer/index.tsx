import { Link } from 'react-router';

const Footer = () => {
  const navs = [
    {
      title: 'Benefit',
      path: '/benefit'
    },
    {
      title: 'Pricing',
      path: '/pricing'
    },
    {
      title: 'Privacy',
      path: '/privacy'
    },
    {
      title: 'Contact Us',
      path: '/contact'
    },
    {
      title: 'Help',
      path: '/help'
    },
    {
      title: 'Terms and Conditions',
      path: '/terms-and-conditions'
    }
  ];

  return (
    <div className="px-5 lg:px-[10%] py-10 md:py-[2%] bg-primary-light text-white flex flex-col lg:flex-row gap-[10%]">
      <div className="text-sm md:w-[30%] text-white">
        <img src="/footer-icon.svg" alt="" className='w-[25%] md:w-[30%]' />
        <p className="mt-5 text-white">School management system is a product of Greenlunar Nigeria Limited</p>
        <p className="mt-5 text-white">5, Badebo street, Ikeja Lagos Nigeria.</p>
      </div>

      <div className="flex flex-row flex-wrap justify-start md:gap-20 text-white w-full lg:w-[52%] mt-5 lg:mt-0">
        {navs.map((nav, i) => (
          <Link key={i} to={nav.path} className="text-white w-[40%] md:w-[25%] text-sm md:text-base">
            {nav.title}
          </Link>
        ))}

        <div className="flex items-center justify-start md:justify-end gap-5 w-[98%]">
          <a href="#" className="hover:scale-90 duration-300 transition-all">
            <img src="/footer/facebook.svg" alt="" />
          </a>
          <a href="#" className="hover:scale-90 duration-300 transition-all">
            <img src="/footer/instagram.svg" alt="" />
          </a>
          <a href="#" className="hover:scale-90 duration-300 transition-all">
            <img src="/footer/linkedin.svg" alt="" />
          </a>
          <a href="#" className="hover:scale-90 duration-300 transition-all">
            <img src="/footer/twitter.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
