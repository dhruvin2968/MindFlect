import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import NotFound from "../assets/images/page-not-found.png";

export const PageNotFound = () => {
  useTitle("Page Not Found - MindFlect");

  return (
    <section className="pageNotFound">
      
      <img src={NotFound} alt="Page Not Found" />
      <Link to="/">
        <button>Back To Home</button>
      </Link>
    </section>
  )
}