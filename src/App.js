import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import Community from "./routes/Community";
import Home from "./routes/Home";
import ListingPage from "./routes/ListingPage";
import Marketplace from "./routes/Marketplace";
import Profile from "./routes/Profile";
import User from "./routes/User";
import ScrollToTop from "./utils/scrollToTop";

function App() {
	const { user } = useAuthContext();

	return (
		<BrowserRouter>
			<ScrollToTop>
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
						<Route path="/listing/:id" element={<ListingPage />} />
						<Route path="/user/:id" element={<User />} />
					</Routes>
					<Footer />
				</div>
			</ScrollToTop>
		</BrowserRouter>
	);
}

export default App;
