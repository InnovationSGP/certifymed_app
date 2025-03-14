'use client';
import { useEffect, useState } from 'react';

const PageTransition = ({ children }) => {
    const [childrenDisplay, setChildrenDisplay] = useState(children);

    useEffect(() => {
        setChildrenDisplay(children);
    }, [children]);

    return (
        <div>
            <div className="w-full strip-1 z-[1000] h-[100vh] fixed top-[0] left-0 bg-primary"></div>
            {childrenDisplay}
        </div>
    );
};

export default PageTransition;
