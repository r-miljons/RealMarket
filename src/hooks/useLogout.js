import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    // in order to log out, simply removing the token from localStorage will log us out

    const logout = () => {
        // remove from storage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({ type: "LOGOUT" });
    };
    
    return {logout};
};