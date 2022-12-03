import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Community from "./routes/Community";
import Home from "./routes/Home";
import Marketplace from "./routes/Marketplace";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/marketplace" element={<Marketplace/>}/>
          <Route path="/community" element={<Community/>}/>
        </Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
