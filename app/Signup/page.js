"use client";
import UserState from "../Context/User/UserState";
import Signup from "./Signup";
import "../Components/css/App.css";

const page = () => {
	return (
		<>
			<UserState>
				<Signup />
			</UserState>
		</>
	);
};

export default page;
