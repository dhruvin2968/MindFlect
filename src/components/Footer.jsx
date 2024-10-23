import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="m-4">
      <p >© 2030 <Link to="/">MindFlect</Link></p>
      <span>Made with <span className="heart">❤</span> by Dhruvin</span> 
      <p>All Rights Reserved</p> 
    </footer>
  )
}