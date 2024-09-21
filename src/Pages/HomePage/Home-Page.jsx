import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function HomePage() {

  let login = false;

  let navigate  = useNavigate();

  useEffect(() => {

    if(login == false){
      navigate("/auth/SignUp")
    }

  } , [])

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
