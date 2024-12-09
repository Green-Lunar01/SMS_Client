const Hero = () => {
  return (
    <div className="md:bg-hero bg-heroMobile bg-cover bg-top h-[70vh] md:h-[74vh] border flex flex-col lg:flex-row justify-between items-center px-5 md:px-16 overflow-hidden">
      <div className="lg:w-[45%] mt-8 lg:mt-0 w-full">
        <h1 className="md:text-5xl text-2xl font-extrabold text-secondary-bold">
          <strong className="text-primary-light md:block mb-5">Empowering Education</strong>{' '}
          Simplifying Management.
        </h1>
        <p className="opacity-80 mt-5 md:mt-3 tracking-wider">
          EduSoft is the all-in-one school management system designed to save you time, boost
          efficiency, and unlock the full potential of your school community.
        </p>
      </div>

      <div className="relative w-full lg:w-[55%] flex items-end justify-end">
        <img
          src="/white-container.svg"
          alt=""
          className="absolute left-0 md:left-28 top-[28%] md:top-[33%] w-[40%] md:w-auto floating"
        />
        <img src="/hero-avatar.png" alt="" className="-mr-10" />
        <img
          src="/green-container.svg"
          alt=""
          className="absolute left-0 md:left-24 bottom-24 md:bottom-28 w-[20%]"
        />
      </div>
    </div>
  );
};

export default Hero;
