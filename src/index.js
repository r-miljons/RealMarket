import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ErrorContextProvider } from "./context/ErrorContext";
import ErrorModule from "./components/ErrorModule/ErrorModule";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<ErrorContextProvider>
		<AuthContextProvider>
			<App />
      <ErrorModule />
		</AuthContextProvider>
	</ErrorContextProvider>
	// </React.StrictMode>
);
