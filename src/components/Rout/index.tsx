import { Route, Routes } from 'react-router';
import Contact from '../../pages/Contact';
import Pricing from '../../pages/Pricing';
import Home from '../../pages/Home';
import Blog from '../../pages/Blog';

const Rout = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
};

export default Rout;
