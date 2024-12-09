import { useContext } from 'react';
import Rout from './components/Rout';
import Header from './components/Header';
import { AppContext } from './context/AppContext';
import MobileHeader from './components/MobileHeader';

const App = () => {
  const { showNav } = useContext(AppContext);

  return (
    <div>
      <Header />
      {showNav && <MobileHeader />}
      <div>
        <Rout />
      </div>
    </div>
  );
};

export default App;
