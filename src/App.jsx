import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Search from "./pages/Search";
import UserProvider from "./context/UserContext";
import FavoritesProvider from "./context/FavoritesContext";

function App() {
	return (
		<Router>
			<UserProvider>
				<FavoritesProvider>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Login />} />
							<Route path="login" element={<Login />} />
							<Route path="search" element={<Search />} />
						</Route>
					</Routes>
				</FavoritesProvider>
			</UserProvider>
		</Router>
	);
}

export default App;
