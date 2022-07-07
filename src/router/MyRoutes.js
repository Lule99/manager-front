import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import PageNotFound from "../components/shared/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home";
import Requests from "../components/requests/Requests";
import Report from "../components/report/Report";
import Vaccine from "../components/vaccine/Vaccine";

const MyRoutes = () => {
  return (
    <Routes>
      <Route
        exact
        path=""
        element={
          <ProtectedRoute
            component={<Home />}
            navigate={<Navigate to={"/login"} />}
          />
        }
      />
      <Route
        exact
        path="/login"
        element={<ProtectedRoute component={<Home />} navigate={<Login />} />}
      />
      <Route
        exact
        path="/home"
        element={
          <ProtectedRoute
            component={<Home />}
            navigate={<Navigate to={"/login"} />}
          />
        }
      />
      <Route
        exact
        path="/requests"
        element={
          <ProtectedRoute
            component={<Requests />}
            navigate={<Navigate to={"/login"} />}
          />
        }
      />
      <Route
        exact
        path="/issue-report"
        element={
          <ProtectedRoute
            component={<Report />}
            navigate={<Navigate to={"/login"} />}
          />
        }
      />
      <Route
        exact
        path="/vaccine-management"
        element={
          <ProtectedRoute
            component={<Vaccine />}
            navigate={<Navigate to={"/login"} />}
          />
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MyRoutes;
