import { Link, NavLink } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import Logo from "../assets/logo.png";
import { useState } from "react";
import Swal from "sweetalert2";

export const Header = () => {

   const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem("isAuth")) || false);
  
  function handleLogin(){
    signInWithPopup(auth, provider).then((result) => {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
      console.log(result);
      Swal.fire({
        title: 'Logged In Successully',
        icon: 'success',
        confirmButtonText: 'Cool!'
      })
    })
    .catch(function (error) {
      console.error(error);
      Swal.fire({
        title: `Login Failed`,
        icon: 'error',
        confirmButtonText: 'Okay'
      })
    })
  }

  function handleLogout(){
    signOut(auth);
    setIsAuth(false);
    localStorage.setItem("isAuth", false);
    Swal.fire({
      title: 'Logged Out Successully!',
      icon: 'success',
      confirmButtonText: 'Okay'
    })
  }

  return (
    <header>
      <Link to="/" className="logo">
        <img src={Logo} alt="MindFlect Logo" />
        <span>MindFlect</span>
      </Link>
      <nav className="nav">
        <NavLink to="/" className="link" end>Home</NavLink>
        { isAuth ? (
          <>
            <NavLink to="/create" className="link">Create</NavLink>
            <button onClick={handleLogout} className="auth"><i className="bi bi-box-arrow-right"></i> Logout</button> 
          </>                   
         ) : (
          <button onClick={handleLogin}  className="auth"><i className="bi bi-google"></i> Login</button>
         ) }         
         
      </nav>
    </header>
  )
}