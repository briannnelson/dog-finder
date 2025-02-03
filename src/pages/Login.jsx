import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
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
			<h1 className="mb-4">Login</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</Container>
	);
}
