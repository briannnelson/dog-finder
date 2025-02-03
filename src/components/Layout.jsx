import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Layout() {
	return (
		<Container>
			<h1 className="my-4 text-center fw-bolder text-primary">DogFinder</h1>
			<Outlet />
		</Container>
	);
}
