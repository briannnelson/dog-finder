import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Search from "./pages/Search";
import UserProvider from "./context/UserContext";
import FavoritesProvider from "./context/FavoritesContext";

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/+$/, "")}>
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
		</BrowserRouter>
	);
}

export default App;
