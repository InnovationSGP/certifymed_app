"use client";
import { ReduxProvider } from "@/app/redux-provider";
import PageTransition from "@/components/common/PageTransition";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import useInitialAuth from "@/hooks/useInitialAuth";

const AuthInitializer = ({ onLoadingComplete }) => {
  const { isLoading } = useInitialAuth();

  useEffect(() => {
    if (!isLoading) {
      onLoadingComplete();
    }
  }, [isLoading, onLoadingComplete]);

  return null;
};

const Mainpage = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <ReduxProvider>
      {loading && <Loader />}
      <AuthInitializer onLoadingComplete={() => setLoading(false)} />
      <PageTransition>{children}</PageTransition>
      <Toaster />
    </ReduxProvider>
  );
};

export default Mainpage;
