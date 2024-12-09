/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppContextType {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContextProvider = ({ children }: any) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <AppContext.Provider
      value={{
        showNav,
        setShowNav
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
