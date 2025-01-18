import { Route, Routes } from 'react-router';
import Contact from '../../pages/Contact';
import Pricing from '../../pages/Pricing';
import Home from '../../pages/Home';
import Blog from '../../pages/Blog';
import Help from '../../pages/Help';
import TermsAndCondition from '../../pages/Terms';
import Privacy from '../../pages/Privacy';

const Rout = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/help" element={<Help />} />
      <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
};

export default Rout;
