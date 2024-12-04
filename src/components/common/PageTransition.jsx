"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageTransition = ({ children }) => {
  const [childrenDisplay, setChildrenDisplay] = useState(children);

  useEffect(() => {
    setChildrenDisplay(children);
  }, [children]);

  return (
    <div>
      <div className="w-full strip-1 z-[1000] h-[100vh] fixed top-[0] left-0 bg-primary"></div>
      {/* <div className="w-full strip-2 z-[1000] h-[33.98vh] fixed top-[33.33%] left-0 bg-[#38B64A]"></div>
      <div className="w-full strip-3 z-[1000] h-[34vh] fixed top-[66.33%] left-0 bg-[#38B64A]"></div> */}

      {childrenDisplay}
    </div>
  );
};

export default PageTransition;
