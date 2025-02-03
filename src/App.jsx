import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Search from "./pages/Search";

function App() {
	return (
		<UserProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Login />} />
						<Route path="login" element={<Login />} />
						<Route path="search" element={<Search />} />
					</Route>
				</Routes>
			</Router>
		</UserProvider>
	);
}

export default App;
