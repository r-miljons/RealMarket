import { createContext, useReducer } from "react";

export const ErrorContext = createContext();

export const errorReducer = (state, action) => {
    switch (action.type) {
        case "SET_ERROR":
            return { error: action.payload };
        case "CLEAR_ERROR": 
            return { error: "" };
        default:
            return state;
    };
};

export const ErrorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(errorReducer, {
        error: "",
    })

    return (
        <ErrorContext.Provider value={{...state, dispatch}}>
            { children }
        </ErrorContext.Provider>
    );
};