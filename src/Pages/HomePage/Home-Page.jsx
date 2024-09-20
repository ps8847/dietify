import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
    <h2>
      For Signup : <Link to={"/auth/SignUp"}>Click here</Link>
    </h2>
    <br />
    <h2>
      For Patients : <Link to={"/patients"}>Click here</Link>
    </h2>
    
    </>
  )
}

export default HomePage