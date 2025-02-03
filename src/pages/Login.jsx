import { useState } from "react";
import { Form, Button, Container, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/auth/login", {
				name,
				email,
			});
			navigate("/search");
		} catch (error) {
			console.error("Login error:", error);
			alert("Login failed. Please check your name and email.");
		}
	};

	return (
		<Container style={{ maxWidth: "400px", marginTop: "2rem" }}>
			<h2 className="mb-4">Login</h2>
			<Form onSubmit={handleSubmit}>
				<FloatingLabel controlId="formName" label="Name" className="mb-3">
					<Form.Control
						type="text"
						placeholder="Enter your name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</FloatingLabel>
				<FloatingLabel controlId="formEmail" label="Email" className="mb-3">
					<Form.Control
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</FloatingLabel>
				<Button variant="primary" type="submit" className="w-100" size="lg">
					Login
				</Button>
			</Form>
		</Container>
	);
}
