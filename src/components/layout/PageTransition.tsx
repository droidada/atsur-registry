import { useState, useEffect } from "react";
import Router from "next/router";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [transitionStage, setTransitionStage] = useState(
    "opacity-0 translate-x-full",
  );

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setTransitionStage("opacity-0 translate-x-full");
      console.log("....it is starting");
    };

    const handleRouteChangeComplete = () => {
      setTransitionStage("opacity-100 translate-x-0");
      console.log("its completing....");
    };

    const handleRouteChangeError = () => {
      setTransitionStage("opacity-0 translate-x-full");
      console.log("....route change error");
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  console.log("This is the stage", transitionStage);

  return (
    <div
      className={`transition-opacity duration-500 ease-in-out transform ${transitionStage}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
