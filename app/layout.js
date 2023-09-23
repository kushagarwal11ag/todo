"use client";
import { useEffect } from "react";

export default function RootLayout({ children }) {
	useEffect(() => {
		import("../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
	}, []);

	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/logo.svg"
				/>
				<link
					rel="stylesheet"
					href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css"
				/>
				<title>DoVerse - Todo App</title>
			</head>
			<body>{children}</body>
		</html>
	);
}
