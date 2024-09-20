import { createBrowserRouter } from "react-router-dom";

import HomePage from "../Pages/HomePage/Home-Page";
import SignUp from "../Pages/SignUpPage/Sign-Up";
import PageNotFound from "../Pages/ErrorPage/PageNotFound/Page-Not-Found";
import PatientPage from "../Pages/PatientsPage/Patient-Page";
import PatientFormPage from "../Pages/PatientsPage/Patient-Form";

const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <HomePage />,
  },
  {
    path: "auth/SignUp",
    exact: true,
    element: <SignUp/>,
  },
  {
    path: "patients",
    exact: true,
    element: <PatientPage/>,
  },
  {
    path: "*",
    exact: true,
    element: <PageNotFound/>,
  }
]);

export default router;
