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





//   const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
//   const options = {method: 'GET', headers: {accept: 'application/json'}};
  const [quote, setQuote] = useState(" Quotes");
//   async function getQuote(){
//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log(data.data.content);
//     setQuote(data.data.content);
//   } catch (error) {
//     console.error(error);
//   }
// }

async function getQuote() {
  const apiUrl = 'https://api.api-ninjas.com/v1/quotes?category=happiness';
  const options = {
    headers: {
      'X-Api-Key': '3SuEcBFudlXGq4tTQiX4LA==B2YBcDgvruZ6leOr'
    }
  };

  try {
    const response = await fetch(apiUrl, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json(); // Parse response as JSON
    console.log(data[0].quote); // Access the 'quote' property of the first object
    setQuote(data[0].quote);
  } catch (error) {
    console.error(error);
  }
}

  return (

<header >
  <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
  <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={Logo} className="h-12" alt="Flowbite Logo" />
      <div className="flex flex-col items-start"> {/* Align text to the left */}
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-blue-950">MindFlect</span>
        <span className="logo-motto text-sm dark:text-gray-400">Reflect. Share. Grow.</span>
      </div>
    </Link>
    <div className="flex items-center space-x-6">
    <nav className="nav">
        <NavLink to="/" className="link" end>Home</NavLink>
        { isAuth ? (
          <>
            <NavLink to="/create" className="link">Create</NavLink>
            <button onClick={handleLogout} className="auth"><i className="bi bi-box-arrow-right"></i> Logout </button> 
          </>                   
         ) : (
          <button onClick={handleLogin}  className="auth"><i className="bi bi-google"></i> Login</button>
         ) }         
         
      </nav>


    </div>
  </div>
  <nav >
  <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
  <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
     
  <div className="flex flex-col items-start w-full px-4"> {/* Ensure full width and padding */}
  <span className="self-center text-2xl font-semibold whitespace-normal break-words dark:text-blue-950">
    <button onClick={getQuote} className="auth">
      <i className="bi bi-arrow-right-circle"></i> {quote}
    </button>
  </span>
</div>

    </Link>
    </div>
</nav>
</header>
  
  )
}