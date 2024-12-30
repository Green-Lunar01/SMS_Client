import Benefits from '../../components/Benefits';
import Features from '../../components/Features';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import PricingCard from '../../components/PricingCard';

const Home = () => {
  return (
    <div>
      <Hero />
      {/* ----- green divider */}
      <div className="bg-primary-light py-12"></div>
      {/* ----- features */}
      <Features />
      {/* ----- benefits */}
      <Benefits />
      {/* ----- pricing */}
      <PricingCard />

      <section className="px-[8%] my-10">
        <div className="flex flex-col items-center text-center gap-4 shadow-md border rounded-xl py-10 px-5">
          <h1 className="text-2xl md:text-4xl font-semibold text-primary-light">
            Ready to experience the EduSoft difference?{' '}
          </h1>
          <h3 className="md:text-lg md:font-semibold md:w-[50%]">
            Sign up for a free trial today and see how our school management system can transform
            your school.
          </h3>

          <button
            type="button"
            className="text-sm py-2.5 px-7 bg-primary-light text-white rounded-md mt-5"
          >
            Create account for free!
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
