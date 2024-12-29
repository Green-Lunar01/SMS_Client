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
    <div className="px-[10%] py-10 md:py-[4%] bg-primary-light text-white flex flex-col md:flex-row items-start justify-between">
      <div className="text-sm md:w-[30%]">
        <h1 className="text-3xl font-bold">EduSoft</h1>
        <p className="mt-5">School management system is a product of Greenlunar Nigeria Limited</p>
        <p className="mt-5">5, Badebo street, Ikeja Lagos Nigeria.</p>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-between gap-[15%] gap-y-7">
        {navs.map((nav, i) => (
          <Link key={i} to={nav.path} className="font-light text-sm">
            {nav.title}
          </Link>
        ))}
        <br />
        <div className="flex items-center gap-5 mt-3">
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
