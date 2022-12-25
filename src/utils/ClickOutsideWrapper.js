import React, { useEffect, useRef } from "react";

export default function ClickOutsideWrapper({children, setIsOpen}) {
    const wrapperRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener("click", handleClickOutside)
        }, 5)
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    },[]);

    function handleClickOutside(e) {
        if (wrapperRef.current.contains(e.target)) return;
        setIsOpen(false);
    }

	return <div ref={wrapperRef}>{children}</div>;
}
