import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Notfound.css'

const NotfoundDashboard = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (<>
    <section className='notFound'>
      <div className="breadcrumbs">
        <a href="/dashboard/insights">Dashboard</a>
        <p>/</p>
        <a href="#">Page Not Found</a>
      </div>

      <main>
        <h2>404 Not Found</h2>
        <p>Your visited page not found.</p>
        <Link to="/dashboard/insights"><button className='button2'>Back to Dashboard</button></Link>
      </main>
    </section>
  </>)
}

export default NotfoundDashboard