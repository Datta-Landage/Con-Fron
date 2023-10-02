import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/landing";
import PageNotFound from "./Pages/PageNotFound";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ChangePassword from "./Pages/Forgetpassword";
import ResetPassword from "./Pages/ResetPassword";
import MyAccount from "./Pages/Account/MyAccount";
import CompanyProfile from "./Pages/Account/Profile";
import Jobs from "./Pages/Account/JobPage";
import AllJobPosts from "./Pages/AllJobs";
import AllCandidatesData from "./Pages/AllCandidates";
import Calender from "./Pages/Account/Calender";
import MessagePage from "./Pages/Account/MessagePage";
import { ROUTES } from "./utils/routes";
import useScrollToTop from "./store/useScrollTop";

const ROUTE_CONFIG = [
  { path: ROUTES.LANDING, element: <LandingPage /> },
  { path: ROUTES.SIGN_UP, element: <SignUp /> },
  { path: ROUTES.SIGN_IN, element: <SignIn /> },
  { path: ROUTES.CHANGE_PASSWORD, element: <ChangePassword /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
  { path: ROUTES.MY_ACCOUNT, element: <MyAccount /> },
  { path: ROUTES.PROFILE, element: <CompanyProfile /> },
  { path: ROUTES.JOBS, element: <Jobs /> },
  { path: ROUTES.ALL_JOBS, element: <AllJobPosts /> },
  { path: ROUTES.ALL_CANDIDATES, element: <AllCandidatesData /> },
  { path: ROUTES.CALENDAR, element: <Calender /> },
  { path: ROUTES.MESSAGES, element: <MessagePage /> },
  { path: ROUTES.NOT_FOUND, element: <PageNotFound /> },
];

function App() {
  useScrollToTop();
  return (
    <>
      <Routes>
        {ROUTE_CONFIG.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
