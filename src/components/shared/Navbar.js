import { Link } from "react-router-dom";
import { logout } from "../../helpers/AuthHelper";

const Navbar = () => {
  let url = window.location.href;
  var split = url.split("/");
  var hide =
    split.length === 5 && (split[4] === "login" || split[4] === "registration");
  return hide ? (
    <></>
  ) : (
    <>
      <nav className="sticky-top navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/requests">
                Pregled Novih Zahteva
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/issue-report">
                Izdavanje Izveštaja
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vaccine-management">
                Pregled Stanja Vakcina
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Pretraga
              </Link>
            </li>
            <li className="nav-item" onClick={logout}>
              <div className="nav-link">Odjava</div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
