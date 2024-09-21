import { createBrowserRouter } from "react-router-dom";

import HomePage from "../Pages/HomePage/Home-Page";
import SignUp from "../Pages/SignUpPage/Sign-Up";
import PageNotFound from "../Pages/ErrorPage/PageNotFound/Page-Not-Found";
import PatientPage from "../Pages/PatientsPage/Patient-Page";
import DietMaster from "../Pages/DietsPage/Diet-Master";
import Layout from "../Pages/Components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <HomePage />,
  },
  {
    path: "auth/SignUp",
    exact: true,
    element: <SignUp />,
  },
  {
    path: "patients",
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
    path: "*",
    exact: true,
    element: <PageNotFound />,
  },
]);

export default router;
