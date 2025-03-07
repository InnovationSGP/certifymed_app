"use client"
import { useEffect } from "react";
import AOS from "aos";
const AosProvider = ({ children }) => {
    useEffect(() => {
        AOS.init({
            duration: 3000,
        });
    }, []);
    return (
        <>
            {children}
        </>
    )
}

export default AosProvider