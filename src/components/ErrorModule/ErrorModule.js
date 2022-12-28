import React, { useEffect } from "react";
import { useErrorContext } from "../../hooks/useErrorContext";
import "./ErrorModule.scss";

export default function ErrorModule() {
    const { error, dispatch } = useErrorContext();

    useEffect(() => {
        // remove error after 10s
        let removeErrorDelay = setTimeout(() => {
            error && dispatch({type: "CLEAR_ERROR"})
        }, 10000)

        return () => clearTimeout(removeErrorDelay)

    }, [dispatch, error]);

    function handleClose() {
        dispatch({type: "CLEAR_ERROR"})
    }

    if (!error) return;

	return (
		<div className="error-module">
            <p>{error}</p>
			<span className="material-symbols-outlined" onClick={handleClose}>close</span>
		</div>
	);
}
