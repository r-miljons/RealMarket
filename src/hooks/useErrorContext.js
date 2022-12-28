import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";


export const useErrorContext = () => {
    const context = useContext(ErrorContext);

    // throw an error if the hook is used outside the provided context
    if (!context) {
        throw Error("useErrorContext must be used inside ErrorContextProvider");
    }

    return context;
};