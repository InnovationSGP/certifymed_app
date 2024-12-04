import { LogoIcon } from "@/components/common/Icons";
import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    // Add the 'no-scroll' class to the body when the component mounts
    document.body.classList.add("no-scroll");

    // Clean up: Remove the 'no-scroll' class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 h-screen w-full flex justify-center overflow-y-hidden items-center bg-[url('/images/hero-bg.png')] bg-cover">
      <p className="loader-scale">
        <LogoIcon />
      </p>
    </div>
  );
}
