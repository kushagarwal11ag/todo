"use client";
import UserState from "../Context/User/UserState";
import Home from "./Home";

const page = () => {
	return (
		<>
			<UserState>
				<Home />
			</UserState>
		</>
	);
};

export default page;
