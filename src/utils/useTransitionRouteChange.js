import { useRouter } from "next/navigation";

export const useTransitionRouteChange = () => {
  const router = useRouter();
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleTransition = async (href) => {
    const body = document.querySelector("body");
    body?.classList.add("page-transition-first-half");
    await sleep(1000);
    router.push(href);
    await sleep(400);
    body?.classList.add("page-transition-second-half");
    await sleep(1000);
    body?.classList.remove("page-transition-second-half");
    body?.classList.remove("page-transition-first-half");
  };
  return {
    handleTransition,
  };
};
