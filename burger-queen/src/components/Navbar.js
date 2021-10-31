import "../style/main.scss"
import React, { useState, useEffect } from "react";
import { Link , useHistory, useLocation} from "react-router-dom";
import Dropdown from "./Dropdown";
import logo from "../images/burger-queen-logo.png";
import jwt_decode from "jwt-decode";

function Navbar() {
    const history = useHistory();
    const location = useLocation();
    

    const [ admin, setShow ] = useState(false)
    const [dropdown, setDropdown] = useState(false);
    const [dropdownTwo, setDropdownTwo] = useState(false);  

    useEffect(() => {
      // localStorage.token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MGMzNGEzMWI2NjZlZTE3OThkMzFlOGQiLCJlbWFpbCI6ImFkbWluQGxvY2FsaG9zdCIsInJvbGVzIjp7ImFkbWluIjp0cnVlfSwiaWF0IjoxNjIzNTU0NzU4LCJleHAiOjk5OTk5OTk5OTk5fQ.zGMhPbJxmlZUvznOr76NqBnI2DKx0l4612qdET0-66w'
      // fx para reconocer si el token tiene admin true o false y reconozca el cambio
      // var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MGQ5ZTQzZjIxMzY2ODYzZWNkOWMwNzQiLCJlbWFpbCI6ImFkbWluQGxvY2FsaG9zdC5jb20iLCJyb2xlcyI6eyJhZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTE3Mjk3OCwiZXhwIjoxNjI1MTc2NTc4fQ.xf5mzm0h2z0u26qWAgy9jm0F15Ws0dRlxQfZZljYgxE";
      
      const token = localStorage.getItem('token')
      if(token !== ''){
        const decoded = (jwt_decode(token).roles.admin);
        setShow(decoded)
      }

      //console.log(localStorage.token)
    }, [admin])

    // fx para salir al login y "cerrar sesión"
    const logOut = () => {
      setShow(false);
      localStorage.token = ''; // cambiando valor de token a vacío
      history.push('/')
    };

    // funciones para activar o desactivar dropdown con hover
    const onMouseEnter = () => {
        setDropdown(true);
    };
    const onMouseLeave = () => {
        setDropdown(false);
    };

    const [isHome, setIsHome] = useState(false);

    //
    useEffect(() => {
      setIsHome( location.pathname === '/home') // llevar a home al loguearse
    }, [location]);


    return (
      <>
        <nav className={`navbar ${ isHome || localStorage.token ==='' ? "hide" : ""}`}>
          <Link to="/home" className="navbar-logo">
            <img alt="BQ" src={logo}></img>
          </Link>
          <ul className= "nav-menu">
            <li
              className="nav-item"
              onMouseEnter={() => setDropdownTwo(true)}
              onMouseLeave={() => setDropdownTwo(false)}
            >
              <Link
                to="/tableOrder"
                className="nav-links"
              >
                Servicio <i className="fas fa-caret-down" />
              </Link>
              {dropdownTwo && <Dropdown title1="Carta" to1="/tableOrder" title2="Ordenes" to2="/OrdersStatus"/>}
            </li>
            <li
              className="nav-item"
            >
              <Link
                to="/kitchen"
                className={`nav-links ${admin === true ? "hide" : "show"}`}
              >
                Cocina 
              </Link>
            </li>
            <li
              className={`nav-item ${admin ===false ? "hide" : "show"}`}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link
                to="/products" 
                className="nav-links"
              >
                Admin <i className="fas fa-caret-down" />
              </Link>
              {dropdown && <Dropdown title1="Almacén" to1="/products" title2="Personal" to2="/users"/>}
            </li>
            <li className="nav-item" >
                <i className="fas fa-sign-out-alt fa-2x" onClick={()=> logOut()}></i>
            </li>
          </ul>
        </nav>
      </>
    );
}

export default Navbar;
