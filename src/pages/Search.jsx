import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DogCard from "../components/DogCard";
import api from "../api";

export default function Search() {
	const [breeds, setBreeds] = useState([]);
	const [selectedBreed, setSelectedBreed] = useState("");
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

	useEffect(() => {
		const handleSearch = async () => {
			if (!selectedBreed) {
				setDogs([]);
				return;
			}
			try {
				const searchResponse = await api.get("/dogs/search", {
					params: {
						breeds: selectedBreed,
						sort: "breed:asc",
						size: 25,
					},
				});

				const ids = searchResponse.data.resultIds;
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
		handleSearch();
	}, [selectedBreed, navigate]);

	const breedOptions = breeds.map((b) => ({ value: b, label: b }));

	return (
		<div>
			<Select
				id="breed-select"
				options={breedOptions}
				value={
					selectedBreed ? { value: selectedBreed, label: selectedBreed } : null
				}
				onChange={(option) => setSelectedBreed(option?.value || "")}
				isClearable
				isSearchable
				placeholder="Select a breed"
			/>
			<div style={{ marginTop: "2rem" }}>
				{dogs.map((dog) => (
					<DogCard key={dog.id} dog={dog} />
				))}
			</div>
		</div>
	);
}
