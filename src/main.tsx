import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import { AppContextProvider } from './context/AppContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
