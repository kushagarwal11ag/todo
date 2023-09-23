import TodoContext from "./TodoContext";
import { useState } from "react";

const TodoState = (props) => {
	const host = "https://todo-f521.onrender.com";
	const todosInitial = [];
	const [todos, setTodos] = useState(todosInitial);

	// Get all Todos
	const getTodos = async () => {
		// API Call
		const response = await fetch(`${host}/api/todo/fetchtodo`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const json = await response.json();

		// Sort todos based on priority
		json.sort((a, b) => {
			if (a.priority === "high" && b.priority !== "high") return -1;
			if (a.priority === "medium" && b.priority === "low") return -1;
			if (a.priority === "low" && b.priority !== "low") return 1;
			return 0;
		});

		setTodos(json);
	};

	// Add Todo
	const addTodo = async (title, description, priority, completed = false) => {
		// TODO: API Call
		// API Call
		const response = await fetch(`${host}/api/todo/addtodo`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, priority, completed }),
		});

		const todo = await response.json();
		// Create a copy of current todos
		let todoSort = [...todos];

		switch (todo.priority) {
			case "high":
				const firstMedium = todoSort.findIndex(
					(t) => t.priority === "medium"
				);
				const firstLow = todoSort.findIndex(
					(t) => t.priority === "low"
				);
				if (firstMedium !== -1) {
					todoSort.splice(firstMedium, 0, todo);
				} else if (firstLow !== -1) {
					todoSort.splice(firstLow, 0, todo);
				} else {
					todoSort.push(todo);
				}
				break;
			case "medium":
				const firstLowPriority = todoSort.findIndex(
					(t) => t.priority === "low"
				);
				firstLowPriority !== -1
					? todoSort.splice(firstLowPriority, 0, todo)
					: todoSort.push(todo);
				break;
			case "low":
			default:
				todoSort.push(todo);
				break;
		}

		setTodos(todoSort);
	};

	// Delete Todo
	const deleteTodo = async (id) => {
		// API Call
		const response = await fetch(`${host}/api/todo/deletetodo/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const newTodos = todos.filter((todo) => {
			return todo._id !== id;
		});
		setTodos(newTodos);
	};

	// Edit a Todo
	const editTodo = async (
		id,
		title,
		description,
		priority,
		completed = false
	) => {
		// API Call
		const response = await fetch(`${host}/api/todo/updatetodo/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, priority, completed }),
		});

		let newTodos = JSON.parse(JSON.stringify(todos));
		// Logic to edit in client
		for (let index = 0; index < newTodos.length; index++) {
			if (newTodos[index]._id === id) {
				newTodos[index].title = title;
				newTodos[index].description = description;
				newTodos[index].priority = priority;
				newTodos[index].completed = completed;
				break;
			}
		}
		const priorityMap = {
			high: 3,
			medium: 2,
			low: 1,
		};

		// Sort todos based on priority
		newTodos.sort(
			(a, b) => priorityMap[b.priority] - priorityMap[a.priority]
		);
		setTodos(newTodos);
	};

	return (
		<TodoContext.Provider
			value={{ todos, addTodo, deleteTodo, editTodo, getTodos }}
		>
			{props.children}
		</TodoContext.Provider>
	);
};
export default TodoState;
