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
  
    
    </>
  )
}

export default HomePage
