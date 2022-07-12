import "../styles/forms.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ParseLogin from "../xmlParsers/ParseLogin";
import axios from "axios";
import { xmlToObject } from "../helpers/XmlToJsConverter";
import { toast } from "react-toastify";
import { getRole, logout } from "../helpers/AuthHelper";

const schema = yup.object().shape({
  password: yup.string().required("Obavezno polje"),
  email: yup.string().required("Obavezno polje!").email("Nevalidan mejl!"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/api/auth/login",
        ParseLogin(data),
        {
          headers: {
            "Content-Type": "application/xml",
          },
        }
      )
      .then((response) => {
        sessionStorage.setItem("token", xmlToObject(response.data));
        if (getRole() != "SLUZBENIK") {
          logout();
          toast.error("Ova aplikacija je samo za sluzbenike!");
        } else {
          window.location.href = "/home";
        }
      })
      .catch((error) => {
        toast.error("Losi kredencijali!");
      });
  };

  return (
    <>
      <div class="authincation h-100">
        <div class="container vh-100">
          <div class="row justify-content-center h-100 align-items-center">
            <div class="col-lg-6 col-md-8">
              <div class="authincation-content">
                <div class="row no-gutters">
                  <div class="col-xl-12">
                    <div class="auth-form">
                      <div class="text-center mb-3">
                        <h2>Servis za sluzbenike</h2>
                        <h3>Prijava</h3>
                      </div>
                      <h4
                        class="text-center mb-4"
                        style={{ marginBottom: "2 rem" }}
                      ></h4>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-group">
                          <label class="mb-1">
                            <strong>Email</strong>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="email"
                            {...register("email")}
                          />
                          <p className="error-message">
                            {errors["email"]?.message}
                          </p>
                        </div>
                        <div class="form-group">
                          <label class="mb-1">
                            <strong>Lozinka</strong>
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            name="password"
                            {...register("password")}
                          />
                          <p className="error-message">
                            {errors["password"]?.message}
                          </p>
                        </div>
                        <div class="text-center">
                          <button
                            type="submit"
                            class="btn btn-primary btn-block"
                          >
                            Prijava
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
