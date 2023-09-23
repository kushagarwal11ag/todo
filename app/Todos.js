import React, { useContext, useEffect, useState, useRef } from "react";
import todoContext from "./Context/Todo/TodoContext.js";
import TodoItem from "./TodoItem.js";
import { useRouter } from "next/navigation";

const Todos = () => {
	const router = useRouter();
	const context = useContext(todoContext);
	const { todos, getTodos, editTodo } = context;
	const [todo, setTodo] = useState({
		id: "",
		etitle: "",
		edescription: "",
		epriority: "",
		completed: false,
	});

	const [activeButton, setActiveButton] = useState("");

	const [selectedOption, setSelectedOption] = useState("btnradio1");

	useEffect(() => {
		getTodos();
	}, []);

	const ref = useRef(null);
	const updateTodo = (currentTodo) => {
		ref.current.click();
		setTodo({
			id: currentTodo._id,
			etitle: currentTodo.title,
			edescription: currentTodo.description,
			epriority: currentTodo.priority,
			completed: currentTodo.completed,
		});
		setActiveButton(currentTodo.priority);
	};

	const onChange = (event) => {
		setTodo({ ...todo, [event.target.name]: event.target.value });
	};

	const handleClick = () => {
		editTodo(
			todo.id,
			todo.etitle,
			todo.edescription,
			todo.epriority.toLowerCase(),
			todo.completed
		);
		setActiveButton("");
	};

	const btnPriority = (event) => {
		setActiveButton(event.target.value);
		setTodo({ ...todo, [event.target.name]: event.target.value });
	};

	return (
		<>
			<div
				className="modal fade"
				id="staticBackdrop"
				ref={ref}
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content" id="edit-modal">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								Edit Task
							</h1>
							<button
								type="button"
								className="btn-close"
								onClick={() => {
									setActiveButton("");
								}}
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="etitle" className="form-label">
									Title
								</label>
								<input
									type="text"
									onChange={onChange}
									className="form-control"
									id="etitle"
									name="etitle"
									value={todo.etitle}
									aria-describedby="title"
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="edescription" className="form-label">
									Description
								</label>
								<textarea
									className="form-control"
									id="edescription"
									name="edescription"
									onChange={onChange}
									value={todo.edescription}
								></textarea>
							</div>
							<div className="mb-3"></div>
							<div className="mb-3">
								<label htmlFor="epriority" className="form-label">
									Priority
								</label>
								<div className="btn-priority">
									<button
										type="button"
										className={`btn btn-priority ${
											activeButton === "high" ? "btn-active-color-high" : ""
										}`}
										onClick={btnPriority}
										name="epriority"
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
										name="epriority"
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
										name="epriority"
										value="low"
									>
										Low
									</button>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="submit"
								className="btn btn-light"
								onClick={handleClick}
								data-bs-toggle="modal"
								data-bs-target="#staticBackdrop"
								disabled={todo.etitle.length < 3}
							>
								Edit
							</button>
						</div>
					</div>
				</div>
			</div>

			{todos.length !== 0 && (
				<div
					className="btn-group container"
					role="group"
					aria-label="Basic radio toggle button group"
				>
					<input
						type="radio"
						className="btn-check"
						name="btnradio"
						id="btnradio1"
						autoComplete="off"
						checked={selectedOption === "btnradio1"}
						onChange={() => setSelectedOption("btnradio1")}
					/>
					<label className="btn" htmlFor="btnradio1">
						Pending Tasks
					</label>

					<input
						type="radio"
						className="btn-check"
						name="btnradio"
						id="btnradio2"
						autoComplete="off"
						checked={selectedOption === "btnradio2"}
						onChange={() => setSelectedOption("btnradio2")}
					/>
					<label className="btn" htmlFor="btnradio2">
						Completed Tasks
					</label>
				</div>
			)}

			{todos.map((todo) => {
				if (
					(selectedOption === "btnradio1" && !todo.completed) ||
					(selectedOption === "btnradio2" && todo.completed)
				) {
					return (
						<TodoItem key={todo._id} updateTodo={updateTodo} todo={todo} />
					);
				}
			})}
		</>
	);
};

export default Todos;
