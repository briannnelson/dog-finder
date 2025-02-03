import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DogCard from "../components/DogCard";
import api from "../api";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Search() {
	const [breeds, setBreeds] = useState([]);
	const [selectedBreed, setSelectedBreed] = useState("");
	const [dogs, setDogs] = useState([]);
	const [searchMeta, setSearchMeta] = useState({
		next: null,
		prev: null,
		total: 0,
	});
	const [matchDog, setMatchDog] = useState(null);

	const navigate = useNavigate();
	const { favorites, addFavorite, removeFavorite, isFavorite } =
		useContext(FavoritesContext);

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

	const handleSearch = async (fromQuery) => {
		try {
			let endpoint = "/dogs/search";

			if (fromQuery) {
				if (fromQuery.startsWith("/")) {
					endpoint = fromQuery;
				} else {
					endpoint += fromQuery;
				}
			} else {
				const params = new URLSearchParams();
				if (selectedBreed) params.append("breeds", selectedBreed);
				params.append("size", 6);
				endpoint += `?${params.toString()}`;
			}

			const searchResponse = await api.get(endpoint);
			const { resultIds, next, prev, total } = searchResponse.data;
			setSearchMeta({ next, prev, total });

			if (resultIds.length > 0) {
				const dogResponse = await api.post("/dogs", resultIds);
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

	useEffect(() => {
		setSearchMeta({ next: null, prev: null, total: 0 });
		setMatchDog(null);
		if (selectedBreed) {
			handleSearch();
		} else {
			setDogs([]);
		}
	}, [selectedBreed]);

	const handleNext = () => {
		if (searchMeta.next) {
			handleSearch(searchMeta.next);
		}
	};

	const handlePrev = () => {
		if (searchMeta.prev) {
			handleSearch(searchMeta.prev);
		}
	};

	const handleMatch = async () => {
		try {
			if (favorites.length === 0) return;
			const matchResponse = await api.post("/dogs/match", favorites);
			const { match } = matchResponse.data;
			const dogRes = await api.post("/dogs", [match]);
			setMatchDog(dogRes.data?.[0] || null);
		} catch (err) {
			console.error("Match error:", err);
			if (err.response?.status === 401) {
				navigate("/login");
			}
		}
	};

	const breedOptions = breeds.map((b) => ({ value: b, label: b }));

	const resultsReady = searchMeta.total > 0

	return (
		<>
			<div className="d-flex align-items-center">
				<Select
					id="breed-select"
					options={breedOptions}
					value={
						selectedBreed
							? { value: selectedBreed, label: selectedBreed }
							: null
					}
					onChange={(option) => setSelectedBreed(option?.value || "")}
					isClearable
					isSearchable
					placeholder="Select a breed"
					className="flex-grow-1 me-3"
				/>
			</div>

			{resultsReady && (
				<div className="mt-3">
					<span className="me-3">
						Favorites: <strong>{favorites.length}</strong>
					</span>
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleMatch}
						disabled={favorites.length === 0}
					>
						Get Match
					</button>
				</div>
			)}

			{matchDog && (
				<div className="mt-4 p-3 border border-success rounded">
					<h5>You matched with:</h5>
					<DogCard dog={matchDog} />
				</div>
			)}

			<div className="mt-4 d-flex flex-wrap">
				{dogs.map((dog) => (
					<div
						key={dog.id}
						className="border p-3 me-3 mb-3"
						style={{ width: "220px" }}
					>
						<DogCard dog={dog} />
						{isFavorite(dog.id) ? (
							<button
								type="button"
								className="btn btn-sm btn-danger mt-2"
								onClick={() => removeFavorite(dog.id)}
							>
								Remove Favorite
							</button>
						) : (
							<button
								type="button"
								className="btn btn-sm btn-success mt-2"
								onClick={() => addFavorite(dog.id)}
							>
								Add to Favorites
							</button>
						)}
					</div>
				))}
			</div>

			{resultsReady && (
				<div className="mt-3 d-flex justify-content-between mb-4">
					<button
						type="button"
						className="btn btn-outline-primary"
						onClick={handlePrev}
						disabled={!searchMeta.prev}
					>
						← Prev
					</button>
					<span className="mx-2 align-self-center">
						Found <strong>{searchMeta.total}</strong> total dogs
					</span>
					<button
						type="button"
						className="btn btn-outline-primary"
						onClick={handleNext}
						disabled={!searchMeta.next}
					>
						Next →
					</button>
				</div>
			)}
		</>
	);
}
