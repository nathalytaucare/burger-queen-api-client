import React, { useEffect,useState } from 'react';
import bigHamburger from '../images/bigHamburger.png';
import burgerQueenLogo from '../images/burger-queen-logo.png';
import '../style/main.scss'
import orders from '../images/hamburger.svg'
import kitchen from '../images/chef.svg'
import admin from '../images/user.svg'
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Home(){

  const [ adminShow, SetAdminShow ] = useState(false)
  
  useEffect(() => {

    const token = localStorage.getItem('token')
    if(token !== ''){
      const decoded = (jwt_decode(token).roles.admin);
      SetAdminShow(decoded)
    }

    //console.log(localStorage.token)
  }, [adminShow])


  //console.log(adminShow);

    return(
      <section className="home">
        <main className="main-home">
          <img src={burgerQueenLogo} id="bq-home" alt="burgerQueenLogo" />
          <img src={bigHamburger} id="hamburguer-home" alt="hamburger" />
          <article className="buttons">
            <Link to="/tableOrder">
						  <button><img alt="orders" src={orders}></img>PEDIDOS</button>
					  </Link>
            <Link to="/kitchen" className={`nav-item ${adminShow === true ? "hide" : "show"}`}>
              <button><img alt="kitchen" src={kitchen}></img>COCINA</button>
            </Link>
            <Link to="/products" className={`nav-item ${adminShow === false ? "hide" : "show"}`}>
              <button><img alt="admin" src={admin}></img>ADMIN</button>
            </Link>
          </article>
        </main>
      </section>
  )
};
  
export default Home;
  