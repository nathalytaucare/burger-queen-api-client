import {postRequest} from '../Services/auth.js';
import React, { useState} from 'react';
import logoBurgerQueen from '../images/BQ-logo.svg';
import comboBQ from '../images/burger-combo.png';
import '../style/main.scss';
import userIcon from '../images/userIcon.png'
import passwordIcon from '../images/passwordIcon.png'

function LogIn (){


  if (!localStorage.token) {
    localStorage.token= "";
  } 


  const [datos, setDatos] = useState({})
  const [hidePassword, setHidePassword] = useState(true)
  const handleInputChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
  }

  const traerDatos = (event) => {
    event.preventDefault() 
    postRequest(
      { 
        email:datos.email,
        password:datos.password,
      }
    )
    .then((resp)=>{
        localStorage.token = resp.data.token
        window.location = '/home';
        console.log('hola');
    })
    .catch((err)=>{
      console.error('email o contraseña incorrectos')
      console.log(datos.email);
      // history.push('/error')
    })
  }

      return (
        <div className="logIn" >
        <header className="logIn-header">
        <img src={logoBurgerQueen} className="bQ-logIn" alt="logo" />
          <form className="logIn-form" onSubmit={traerDatos}>
            <label>
              Correo electrónico:
              <div className="inputLogIn">
              <img src={userIcon} alt="passwordPic"/>
              <input 
              type="email" 
              name="email"
              onChange={handleInputChange }
              />
              </div>
            </label>
            <label>
              Contraseña:
              <div className="inputLogIn">
              <img src={passwordIcon} alt="userPic"/>
              <input 
              type={hidePassword ? "password" : "text"}
              name="password"
              onChange={handleInputChange }/>
              <i className={hidePassword ? "far fa-eye-slash" : "far fa-eye"} onClick={()=> hidePassword ? setHidePassword(false) : setHidePassword(true) }></i>
              </div>
              
            </label>
            <button className="logIn-button" > INGRESAR </button>
          </form>
        </header>
        <img src={comboBQ} className="bQ-combo" alt="logo" />
      </div>

    );
}
  
export default LogIn;
