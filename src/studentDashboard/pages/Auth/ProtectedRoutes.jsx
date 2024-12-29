import Layout from "../../layout/Layout";
import { Outlet } from "react-router-dom";
import React from 'react'

function ProtectedRoutes({showModal, handleModal, setShowModal}) {
 
  return (
    <Layout showModal={showModal} handleModal={handleModal} setShowModal={setShowModal}>
        
        <div className="flex justify-end">
        <div className="md:w-[82%] w-full  ">
            <Outlet  />
        </div>
    </div>

    </Layout>
  )
}

export default ProtectedRoutes