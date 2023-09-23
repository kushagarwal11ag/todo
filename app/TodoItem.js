import todoContext from "@/app/Context/Todo/TodoContext";
import React, { useContext } from "react";
import "./Components/css/TodoItem.css";

const TodoItem = (props) => {
	const context = useContext(todoContext);
	const { editTodo, deleteTodo } = context;
	const { todo, updateTodo } = props;

	const modalId = `viewModal-${todo._id}`;

	const handleCheckboxChange = (todo) => {
		editTodo(
			todo._id,
			todo.title,
			todo.description,
			todo.priority,
			!todo.completed
		);
		updateTodo({ ...todo, completed: !todo.completed });
	};

	return (
		<>
			<div className="container todo">
				<div className={`${todo.priority} priority`}></div>
				<div className="container todo-details">
					<div
						className="todo-text"
						data-bs-toggle="modal"
						data-bs-target={`#${modalId}`}
					>
						<div className="todo-title">{todo.title}</div>
						<div className="todo-description">{todo.description}</div>
					</div>
					<div className="todo-function">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id="flexCheckDefault"
							name="completed"
							checked={todo.completed}
							onChange={() => handleCheckboxChange(todo)}
						/>
						<i
							className="far fa-edit"
							data-bs-toggle="modal"
							data-bs-target="#staticBackdrop"
							onClick={() => {
								updateTodo(todo);
							}}
						></i>
						<i
							className="fa-regular fa-trash"
							onClick={() => {
								deleteTodo(todo._id);
							}}
						></i>
					</div>
				</div>
			</div>

			<div
				className="modal fade"
				id={`${modalId}`}
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content" id="view-modal">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								View Task
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="title" className="form-label">
									Title
								</label>
								<div className="todo-title">{todo.title}</div>
							</div>
							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Description
								</label>
								<textarea
									className="todo-description"
									disabled
									value={
										todo.description
											? todo.description
											: "No description added yet"
									}
									rows={5}
								></textarea>
							</div>
							<div className="mb-3">
								<label htmlFor="priority" className="form-label">
									Priority
								</label>
								<div className="btn-priority">
									{todo.priority === "high" ? (
										<button
											type="button"
											className="btn btn-view btn-active-color-high"
											name="priority"
											value="high"
										>
											High
										</button>
									) : todo.priority === "medium" ? (
										<button
											type="button"
											className="btn btn-view btn-active-color-medium"
											name="priority"
											value="medium"
										>
											Medium
										</button>
									) : (
										<button
											type="button"
											className="btn btn-view btn-active-color-low"
											name="priority"
											value="low"
										>
											Low
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TodoItem;
