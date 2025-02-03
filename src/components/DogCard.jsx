import React from "react";

export default function DogCard({ dog }) {
	return (
		<div
			style={{
				border: "1px solid #ccc",
				marginBottom: "1rem",
				padding: "1rem",
			}}
		>
			<img src={dog.img} alt={dog.name} style={{ width: "150px" }} />
			<br />
			<strong>Name:</strong> {dog.name}
			<br />
			<strong>Breed:</strong> {dog.breed}
			<br />
			<strong>Age:</strong> {dog.age}
			<br />
			<strong>ZIP Code:</strong> {dog.zip_code}
		</div>
	);
}
