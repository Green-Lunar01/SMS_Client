import Footer from '../../components/Footer';
import PricingCard from '../../components/PricingCard';
import PricingTable from '../../components/PricingTable';

const Pricing = () => {
  return (
    <section>
      <div className="md:bg-header bg-headerMobile bg-cover bg-top text-center h-[40vh] text-white flex flex-col justify-center items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white">Pricing</h1>
        <h3 className="md:mt-8 md:mb-4 my-5 text-2xl text-white">Price that is transparent and flexible.</h3>
        <p className="lg:w-[20%] mx-auto text-white">
          Invest in your school and get the desired, actual benefit.
        </p>
      </div>

      <PricingCard isPage={true} />

      <PricingTable />

      <Footer />
    </section>
  );
};

export default Pricing;
