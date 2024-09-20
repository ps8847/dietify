import React from 'react'
import Dashboard from '../Components/Dashboard'
import MainGrid from './Components/MainGrid'

function PatientPage() {
  return (
    <Dashboard AppnavHeading={"Patients"} HeaderHeading={"Patients"} MainGrid={<MainGrid />}/>
  )
}

export default PatientPage