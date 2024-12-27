const Benefits = () => {
  const benefits = [
    {
      title: 'Improve Communication & Collaboration',
      src: '/benefits/benefit-a.png',
      caption:
        'Foster a stronger connection between teachers, parents, and students for a more engaged and supportive school community'
    },
    {
      title: 'Enhance Learning Outcomes',
      src: '/benefits/benefit-b.png',
      caption:
        'Create a dynamic and personalized learning environment that caters to individual needs and fosters academic success'
    },
    {
      title: 'Save Time & Resources',
      src: '/benefits/benefit-c.png',
      caption:
        'Reduce administrative workload and free up valuable time for what matters most - your students and their education.'
    },
    {
      title: 'Boost Efficiency & Productivity',
      src: '/benefits/benefit-d.png',
      caption:
        "Automate tasks, streamline processes, and gain real-time insights to optimize your school's operations."
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-5 px-5 md:px-16 my-10 justify-between">
      <div className="text-center w-full md:w-[50%]">
        <h1 className="text-xl font-semibold text-primary-light">Benefits</h1>
        <p className="text-3xl my-7 leading-9 text-secondary-bold">
          See how we can improve your School management.
        </p>
        <div className="h-[65vh] border overflow-hidden rounded-lg">
          <img
            src="/benefits/benefit.png"
            alt=""
            className="w-full h-full object-cover hover:scale-110 duration-500 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-7 p-3 md:border rounded-md md:w-[47%]">
        {benefits.map((data, i) => (
          <div
            className="flex items-center gap-8 border-b border-b-primary-light px-3 py-5"
            key={i}
          >
            <img
              src={data.src}
              alt={data.title}
              className="w-24 hover:scale-110 duration-300 transition-all hidden md:block"
            />

            <div>
              <div className="flex items-center gap-5 py-3">
                <img
                  src={data.src}
                  alt={data.title}
                  className="w-10 hover:scale-110 duration-300 transition-all block md:hidden"
                />
                <h1 className="text-primary-light mb-3">{data.title}</h1>
              </div>
              <p className="text-sm">{data.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
