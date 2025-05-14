import React from "react";

export default function DogCard({ dog }) {
	const fallbackImg = new URL('/dog-thumbnail.png', window.location.origin).href;
	return (
		<div>
			<img
				src={dog.img}
				alt={dog.name}
				style={{ width: "100%", objectFit: "cover", marginBottom: "0.5rem", maxWidth: "220px" }}
 				onError={(e) => {
					e.target.onerror = null;
					e.target.src = fallbackImg;
				}}
			/>
			<div>
				<strong>Name:</strong> {dog.name}
			</div>
			<div>
				<strong>Breed:</strong> {dog.breed}
			</div>
			<div>
				<strong>Age:</strong> {dog.age}
			</div>
			<div>
				<strong>ZIP Code:</strong> {dog.zip_code}
			</div>
		</div>
	);
}
