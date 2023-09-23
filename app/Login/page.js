"use client";
import UserState from "../Context/User/UserState";
import Login from "./Login";
import "../Components/css/App.css";

const page = () => {
	return (
		<>
			<UserState>
				<Login />
			</UserState>
		</>
	);
};

export default page;
