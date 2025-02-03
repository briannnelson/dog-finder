import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import api from "../api";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export default function Layout() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);

	const handleLogout = async () => {
		try {
			await api.post("/auth/logout");
			setUser(null);
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<Container>
			{location.pathname === "/search" && (
				<div className="d-flex justify-content-between align-items-center my-2">
					<div>
						{user?.name ? `Hi ${user.name}!` : null}
					</div>
					<div>
						<Button
							variant="outline-secondary"
							onClick={handleLogout}
							size="sm"
						>
							Logout
						</Button>
					</div>
				</div>
			)}
			<h1 className="my-4 text-center fw-bolder text-primary">DogFinder</h1>
			<Outlet />
		</Container>
	);
}
