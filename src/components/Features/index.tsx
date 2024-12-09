const Features = () => {
  const features = [
    {
      title: 'Streamlined Administration',
      src: '/features/feature-a.png',
      caption:
        'Manage student information, schedules, fees, and grades with ease. Generate reports, send automated notifications, and track progress with just a few clicks.'
    },
    {
      title: 'Boosting Engagement',
      src: '/features/feature-b.png',
      caption:
        'Create a dynamic learning environment with our online learning tools and resources. Assign homework, track progress, and provide personalized feedback, all within the platform.'
    },
    {
      title: 'Enhanced Communication',
      src: '/features/feature-c.png',
      caption:
        'Connect with parents, teachers, and students instantly through a secure messaging system. Share updates, announcements, and assignments in real-time.'
    },
    {
      title: 'Data-Driven Decisions',
      src: '/features/feature-d.png',
      caption:
        "Gain valuable insights with comprehensive reports and analytics. Track performance, identify trends, and make informed decisions to improve your school's operations."
    },
    {
      title: 'Secure & Scalable',
      src: '/features/feature-e.png',
      caption:
        'EduSoft is built with the highest security standards and cloud-based technology to ensure data privacy and scalability. Access your system from anywhere, anytime, on any device.'
    }
  ];

  return (
    <div className="md:px-16 py-10">
      <div className="md:border rounded-md border-primary-light text-center p-5 md:p-10">
        <h1 className="text-primary-light text-xl font-semibold">Features</h1>
        <p className="text-sm mt-5 md:w-[40%] mx-auto text-secondary-bold font-light">
          Our comprehensive platform seamlessly integrates all aspects of school administration,
          from academics and attendance to finance and communication, into one user-friendly
          interface.
        </p>

        <div className="flex flex-col md:flex-row flex-wrap gap-[5%] gap-y-10 mt-10">
          {features.map((feature, i) => (
            <div key={i} className="border rounded-xl md:w-[30%] overflow-hidden">
              <div className="h-[30vh] overflow-hidden w-full">
                <img
                  src={feature.src}
                  alt={feature.title}
                  className="w-full h-full object-cover hover:scale-110 duration-500 transition-all"
                />
              </div>
              <div className="px-5 py-6">
                <h1 className="text-primary-light">{feature.title}</h1>
                <p className="text-sm mt-3 text-secondary-bold opacity-40 text-left">
                  {feature.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
