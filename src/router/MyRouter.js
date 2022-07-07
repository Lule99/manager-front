import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./MyRoutes";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../components/shared/Navbar";

const MyRouter = () => {
  return (
    <BrowserRouter>
      <ProtectedRoute component={<Navbar />} navigate={<></>} />
      <MyRoutes />
    </BrowserRouter>
  );
};

export default MyRouter;
