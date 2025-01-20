import { Outlet } from "react-router";

import Layout from "../../Layout/Layout";
const Rout = () => {
	return (
		<div>
			<Layout>
				<Outlet/>
		    </Layout>
		   
		</div>
	);
};

export default Rout;
