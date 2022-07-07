import { isAuthenticated } from "../helpers/AuthHelper";

function ProtectedRoute({ component, navigate }) {
  return isAuthenticated() ? component : navigate;
}

export default ProtectedRoute;
