import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import Community from "./routes/Community";
import Home from "./routes/Home";
import Marketplace from "./routes/Marketplace";
import Profile from "./routes/Profile";

function App() {
	const { user } = useAuthContext();

	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/marketplace" element={<Marketplace />} />
					<Route path="/community" element={<Community />} />
					<Route
						path="/profile"
						element={user ? <Profile /> : <Navigate to="/" />}
					/>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
