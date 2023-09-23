import React, { useContext, useState } from "react";
import todoContext from "./Context/Todo/TodoContext.js";
import "./Components/css/TodoItem.css";

const CreateTodo = () => {
	const context = useContext(todoContext);
	const { addTodo } = context;

	const [todo, setTodo] = useState({
		title: "",
		description: "",
		priority: "",
		completed: false,
	});

	const [activeButton, setActiveButton] = useState("");

	const addTodoFn = (event) => {
		event.preventDefault();
		addTodo(todo.title, todo.description, todo.priority, todo.completed);
		setTodo({
			title: "",
			description: "",
			priority: "",
			completed: false,
		});
		setActiveButton("");
	};

	const clearValues = () => {
		setTodo({
			title: "",
			description: "",
			priority: "",
			completed: false,
		});
		setActiveButton("");
	};

	const onChange = (event) => {
		setTodo({ ...todo, [event.target.name]: event.target.value });
	};

	const btnPriority = (event) => {
		setTodo({ ...todo, [event.target.name]: event.target.value });
		setActiveButton(event.target.value);
	};

	return (
		<>
			<div
				className="pill"
				data-bs-toggle="modal"
				data-bs-target="#create-todo"
			>
				<i className="fa-solid fa-plus"></i>
				<div>Add Task</div>
			</div>

			<div
				className="modal fade"
				id="create-todo"
				data-bs-keyboard="false"
				data-bs-backdrop="static"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content" id="create-modal">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								Add Task
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={clearValues}
							></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="title" className="form-label">
									Title
								</label>
								<input
									type="text"
									onChange={onChange}
									className="form-control"
									id="title"
									name="title"
									value={todo.title}
									aria-describedby="title"
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Description
								</label>
								<textarea
									onChange={onChange}
									className="form-control"
									id="description"
									name="description"
									value={todo.description}
									rows={5}
								></textarea>
							</div>
							<div className="mb-3">
								<label htmlFor="priority" className="form-label">
									Priority
								</label>
								<div className="btn-priority">
									<button
										type="button"
										className={`btn btn-priority ${
											activeButton === "high" ? "btn-active-color-high" : ""
										}`}
										onClick={btnPriority}
										name="priority"
										value="high"
									>
										High
									</button>
									<button
										type="button"
										className={`btn btn-priority ${
											activeButton === "medium" ? "btn-active-color-medium" : ""
										}`}
										onClick={btnPriority}
										name="priority"
										value="medium"
									>
										Medium
									</button>
									<button
										type="button"
										className={`btn btn-priority ${
											activeButton === "low" ? "btn-active-color-low" : ""
										}`}
										onClick={btnPriority}
										name="priority"
										value="low"
									>
										Low
									</button>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="submit"
									className="btn btn-light"
									onClick={addTodoFn}
									data-bs-toggle="modal"
									data-bs-target="#create-todo"
									disabled={todo.title.length < 3 || todo.priority === ""}
								>
									Add
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateTodo;
