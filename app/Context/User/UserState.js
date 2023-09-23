import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
	const host = "https://todo-f521.onrender.com";
	const [user, setUser] = useState(null);

	// Get user data
	const getUserDetails = async () => {
		// API Call
		const response = await fetch(`${host}/api/auth/getuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const json = await response.json();
		setUser(json);
		return json;
	};

	// Create User
	const createUser = async (name, email, password) => {
		// TODO: API Call
		// API Call
		const response = await fetch(`${host}/api/auth/createuser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ name, email, password }),
		});

		const newUser = await response.json();
		return newUser;
	};

	//User login
	const userLogin = async (email, password) => {
		// TODO: API Call
		// API Call
		const response = await fetch(`${host}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const json = await response.json();
		return json;
	};

	// Edit user
	const editUser = async (id, name, password, image = "") => {
		// API Call
		const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ name, password, image }),
		});
		let userResponse = await response.json();
		let newUser = JSON.parse(JSON.stringify(user));
		// Logic to edit in client
		if (newUser._id === id) {
			newUser.name = name;
			newUser.image = image;
			if (password !== "") newUser.password = password;
		}
		setUser(newUser);
		return userResponse.success;
	};

	return (
		<UserContext.Provider
			value={{ user, getUserDetails, createUser, userLogin, editUser }}
		>
			{props.children}
		</UserContext.Provider>
	);
};
export default UserState;
