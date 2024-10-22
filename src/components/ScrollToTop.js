import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);  //whenever dependency - pathname changes , useEffect will
                    //run and scroll to top   

  return null;  //no content to return 
}
