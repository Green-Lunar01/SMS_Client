import Footer from '../../components/Footer';

const Contact = () => {
  const contacts = [
    {
      title: 'Address',
      caption: '5, Badebo street, Ikeja Lagos Nigeria',
      src: '/contact/contact-a.svg'
    },
    {
      title: 'Email',
      caption: 'Edusoft@gmail.com',
      src: '/contact/contact-b.svg'
    },
    {
      title: 'Phone',
      caption: 'Call Customer services on',
      caption2: '+234707874563',
      src: '/contact/contact-c.svg'
    }
  ];

  return (
    <section>
      <div className="md:bg-header bg-headerMobile bg-cover bg-top text-center h-[40vh] text-white flex flex-col justify-center items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white">Contact Us</h1>
        <h3 className="md:mt-8 mt-3 mb-4 text-lg md:text-2xl text-white">We’d like to hear from you.</h3>
      </div>

      <div className="md:w-[60%] w-[90%] bg-white border shadow-md mx-auto p-10 md:p-14 rounded-lg -mt-32 md:-mt-20 z-10 flex gap-y-10 flex-col-reverse md:flex-row items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Contact us</h1>

          <div className="mt-10 flex flex-col gap-10">
            {contacts.map((data, i) => (
              <div key={i} className="flex items-start gap-5">
                <img src={data.src} alt="" className="w-12" />

                <div>
                  <h1>{data.title}</h1>
                  <p className="mt-2 text-xs font-light">{data.caption}</p>
                  {data.caption2 && <p className="mt-2 text-xs font-light">{data.caption2}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border md:w-[47%] w-full text-center shadow-md rounded-md p-5 md:p-10">
          <h3 className="text-primary-light text-xl font-bold">Drop a message</h3>
          <p className="text-xs">Feel free to contact us</p>

          <form className="flex flex-col gap-5 mt-14">
            <input
              type="text"
              className="px-3 py-2 w-full border-b outline-none placeholder:text-black text-sm placeholder:text-xs"
              placeholder="Your Name"
            />
            <input
              type="email"
              className="px-3 py-2 w-full border-b outline-none placeholder:text-black text-sm placeholder:text-xs"
              placeholder="Your Email"
            />
            <input
              type="text"
              className="px-3 py-2 w-full border-b outline-none placeholder:text-black text-sm placeholder:text-xs"
              placeholder="Message"
            />

            <button
              type="submit"
              className="px-5 py-3 w-fit text-xs bg-primary-light text-white rounded-md mt-5"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="w-[90%] mx-auto h-[50vh] border overflow-hidden my-20 rounded-md">
        <img
          src="/map.png"
          alt=""
          className="w-full h-full object-cover rounded-md hover:scale-110 duration-500 transition-all"
        />
      </div>

      <Footer />
    </section>
  );
};

export default Contact;
