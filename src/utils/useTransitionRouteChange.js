"use client"
import { preFetchRoutes } from "@/lib/preFetchRoutes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const useTransitionRouteChange = () => {
  const router = useRouter();
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleTransition = async (href) => {
    const body = document.querySelector("body");
    body?.classList.add("page-transition-first-half");
    await sleep(500);
    router.push(href);
    await sleep(400);
    body?.classList.add("page-transition-second-half");
    await sleep(1000);
    body?.classList.remove("page-transition-second-half");
    body?.classList.remove("page-transition-first-half");
  };

  useEffect(() => {
    for (let route of preFetchRoutes) {
      router.prefetch(route.href);
    }
  }, [router])

  return {
    handleTransition,
  };
};
