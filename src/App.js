import MyRouter from "./router/MyRouter";
import "./helpers/interceptors/TokenInterceptor";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="main-container">
        <MyRouter />
      </div>
    </>
  );
}

export default App;
