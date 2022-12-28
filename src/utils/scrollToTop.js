import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();

  useEffect(() => {
    // if hash is included then scroll to the element
    if (location.hash) {
        try {
            document.querySelector(location.hash).scrollIntoView()
        } catch (e) {
            console.log(e);
        }
    } else {
        window.scrollTo(0, 0)
    }

  }, [location.pathname, location.hash]);

  return <>{props.children}</>
};

export default ScrollToTop;