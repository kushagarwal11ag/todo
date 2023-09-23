"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import TodoState from "@/app/Context/Todo/TodoState";

import Header from "../Header";
import Todos from "../Todos";
import CreateTodo from "../CreateTodo";
import Navbar from "../Navbar/page";

function App() {
	const router = useRouter();

	useEffect(() => {
		if (!localStorage.getItem("token")) router.push("/Login");
	}, []);

	return (
		<>
			<TodoState>
				<Navbar title={"Account"} />
				<Header />

				<div className="task-container">
					<Todos />
				</div>

				<CreateTodo />
			</TodoState>
		</>
	);
}

export default App;
