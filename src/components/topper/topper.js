import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Topper = ({ children }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.history?.scrollRestoration ?
      window.history.scrollRestoration = 'manual' :
      window.scrollTo({top: 0, behavior: 'auto'})
  }, [pathname])

  return children
}

export default Topper;