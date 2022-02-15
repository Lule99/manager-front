import { Link } from 'react-router-dom';

const Navbar = () => {
  let url = window.location.href;
  var split = url.split('/')
  var hide = split.length === 5 && ( split[4] === 'login' || split[4] === 'registration');
    return hide? <></> : <>
     <nav className="sticky-top navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/api/home">Pregled Novih Zahteva</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/api/issue-report">Izdavanje Izveštaja</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/api/vaccine-management">Pregled Stanja Vakcina</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/api/search">Pretraga</Link>
              </li>
        </ul>  
      </div>
    </nav>
    </>
}

export default Navbar;