import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DogCard from "../components/DogCard";
import api from "../api";

export default function Search() {
	const [breeds, setBreeds] = useState([]);
	const [selectedBreed, setSelectedBreed] = useState("");
	const [dogIds, setDogIds] = useState([]);
	const [dogs, setDogs] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBreeds = async () => {
			try {
				const response = await api.get("/dogs/breeds");
				setBreeds(response.data);
			} catch (err) {
				console.error(err);
				if (err.response?.status === 401) {
					navigate("/login");
				}
			}
		};
		fetchBreeds();
	}, [navigate]);

	const handleSearch = async () => {
		try {
			const searchResponse = await api.get("/dogs/search", {
				params: {
					breeds: selectedBreed,
					sort: "breed:asc",
					size: 25,
				},
			});
			const ids = searchResponse.data.resultIds;
			setDogIds(ids);
			if (ids.length > 0) {
				const dogResponse = await api.post("/dogs", ids);
				setDogs(dogResponse.data);
			} else {
				setDogs([]);
			}
		} catch (err) {
			console.error("Search error:", err);
			if (err.response?.status === 401) {
				navigate("/login");
			}
		}
	};

	return (
		<div>
			<h2>Search Dogs</h2>
			<label>Breed: </label>
			<select
				value={selectedBreed}
				onChange={(e) => setSelectedBreed(e.target.value)}
			>
				<option value="">-- Select Breed --</option>
				{breeds.map((b) => (
					<option key={b} value={b}>
						{b}
					</option>
				))}
			</select>
			<button onClick={handleSearch} style={{ marginLeft: "1rem" }}>
				Search
			</button>
			<div style={{ marginTop: "2rem" }}>
				<h3>Results</h3>
				{dogs.map((dog) => (
					<DogCard key={dog.id} dog={dog} />
				))}
			</div>
		</div>
	);
}
