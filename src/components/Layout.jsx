import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Layout() {
	return (
		<Container>
			<h1 className="my-4">My Dog App</h1>
			<Outlet />
		</Container>
	);
}
