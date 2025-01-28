"use client";
import { ReduxProvider } from "@/app/redux-provider";
import PageTransition from "@/components/common/PageTransition";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import useInitialAuth from "@/hooks/useInitialAuth";

const Mainpage = ({ children }) => {
  const [loading, setLoading] = useState(true);

  // Add the auth hook
  const InitialAuthComponent = () => {
    const { isLoading } = useInitialAuth();

    useEffect(() => {
      if (!isLoading) {
        setLoading(false);
      }
    }, [isLoading]);

    return null;
  };

  return (
    <>
      {loading && <Loader />}
      <ReduxProvider>
        <InitialAuthComponent />
        <PageTransition>{children}</PageTransition>
        <Toaster />
      </ReduxProvider>
    </>
  );
};

export default Mainpage;
