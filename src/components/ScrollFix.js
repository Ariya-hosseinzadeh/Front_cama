import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollFix = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, [location]);

  return null;
};

export default ScrollFix;
