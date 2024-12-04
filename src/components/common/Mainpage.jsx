"use client";
import { ReduxProvider } from "@/app/redux-provider";
import PageTransition from "@/components/common/PageTransition";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./Loader";

const Mainpage = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      {loading && <Loader />}
      <ReduxProvider>
        <PageTransition>{children}</PageTransition>
        <Toaster />
      </ReduxProvider>
    </>
  );
};

export default Mainpage;
