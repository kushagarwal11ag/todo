"use client";
import UserState from "../Context/User/UserState";
import Account from "./Account";
import "../Components/css/App.css";

const page = () => {
	
	return (
		<>
			<UserState>
				<Account />
			</UserState>
		</>
	);
};

export default page;
