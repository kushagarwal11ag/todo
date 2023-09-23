"use client";
import UserState from "../Context/User/UserState";
import Navbar from "./Navbar"
import "../Components/css/App.css";

const page = (props) => {
	return (
		<>
			<UserState>
				<Navbar {...props}/>
			</UserState>
		</>
	);
};

export default page;
