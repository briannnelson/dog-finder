import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import api from "../api";

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
					<div>{user?.name ? `Hi ${user.name}!` : null}</div>
					<div>
						<Button
							variant="outline-secondary"
							onClick={handleLogout}
							size="sm"
						>
							<FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
							Log Out
						</Button>
					</div>
				</div>
			)}
			<h1 className="my-4 text-center fw-bolder text-primary">DogFinder</h1>
			<Outlet />
		</Container>
	);
}
