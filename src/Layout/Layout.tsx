
import Header from "../components/Header/index.tsx";
import { AppContext } from "../context/AppContext";
import MobileHeader from "../components/MobileHeader";
import { useContext } from "react";

type LayoutProps = React.PropsWithChildren<{}>;


const Layout = ({children}: LayoutProps) => {
    const { showNav } = useContext(AppContext);
  return (
    <div>
        <Header />
        {showNav && <MobileHeader />}
        <div>
          {children}
        </div>
    </div>
  )
}

export default Layout