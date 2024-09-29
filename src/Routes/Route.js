import { createBrowserRouter, useNavigate } from "react-router-dom";

import HomePage from "../Pages/HomePage/Home-Page";
import SignUp from "../Pages/SignUpPage/Sign-Up";
import PageNotFound from "../Pages/ErrorPage/PageNotFound/Page-Not-Found";
import PatientPage from "../Pages/PatientsPage/Patient-Page";
import DietMaster from "../Pages/DietsPage/Diet-Master";
import Layout from "../Pages/Components/Layout";
import PatientDietPage from "../Pages/PatientDietPage/Patient-Diet-Page";
import PaymentsPage from "../Pages/PaymentsPage/Payments-Page";

const router = createBrowserRouter([
  
  {
    path: "auth/SignUp",
    exact: true,
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Layout AppnavHeading="Patients" HeaderHeading="Patients" />,  // Wrap Patients in Layout
    children: [
      {
        index: true,
        element: <PatientPage />,
      },
    ],
  },
  {
    path: "diet-master",
    element: <Layout AppnavHeading="Diet Master" HeaderHeading="Diet Master" />,  // Wrap Diet Master in Layout
    children: [
      {
        index: true,
        element: <DietMaster />,
      },
    ],
  },
  {
    path: "patient-diet",
    element: <Layout AppnavHeading="Patient Diet" HeaderHeading="Patient Diet" />,  // Wrap Diet Master in Layout
    children: [
      {
        index: true,
        element: <PatientDietPage />,
      },
    ],
  },
  {
    path: "payments",
    element: <Layout AppnavHeading="Payments" HeaderHeading="Payments" />,  // Wrap Diet Master in Layout
    children: [
      {
        index: true,
        element: <PaymentsPage />,
      },
    ],
  },
  {
    path: "*",
    exact: true,
    element: <PageNotFound />,
  },
]);

export default router;
