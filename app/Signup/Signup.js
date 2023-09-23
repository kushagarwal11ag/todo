"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserContext from "../Context/User/UserContext";
import "../Components/css/LoginSignup.css";

const Signup = () => {
	const router = useRouter();
	const context = useContext(UserContext);
	const { createUser } = context;

	const [alertText, setAlertText] = useState("");
	const [spinner, setSpinner] = useState(false);
	const [credentials, setCredentials] = useState({
		userName: "",
		email: "",
		password: "",
		cpassword: "",
	});

	const onChange = (event) => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		});
		setAlertText("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSpinner(true);
		if (credentials.password !== credentials.cpassword) {
			setAlertText("Password Mismatch");
			setSpinner(false);
		} else {
			const userResponse = await createUser(
				credentials.userName,
				credentials.email,
				credentials.password
			);
			setCredentials({
				userName: "",
				email: "",
				password: "",
				cpassword: "",
			});
			if (userResponse.success) {
				setSpinner(false);
				setAlertText("Logged in successfully");
				//Save auth token and redirect
				localStorage.setItem("token", userResponse.authToken);
				router.push("/Home");
			} else {
				setSpinner(false);
				setAlertText("Invalid Credentials");
			}
		}
	};

	return (
		<>
			<section className="vh-100" style={{ backgroundColor: "#fdf0d5" }}>
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col col-xl-10">
							<div
								className="card"
								style={{ borderRadius: "1rem" }}
							>
								<div className="row g-0">
									<div className="col-md-6 col-lg-5 d-none d-md-block">
										<img
											src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
											alt="Woman creating todos for the day"
											className="img-fluid"
											style={{
												borderRadius: "1rem 0 0 1rem",
												height: "100%",
											}}
										/>
									</div>
									<div className="col-md-6 col-lg-7 d-flex align-items-center">
										<div className="card-body p-4 p-lg-5">
											<form
												className={`container ${
													alertText ===
													"Password Mismatch"
														? "passwordMismatch"
														: alertText ===
														  "Invalid Credentials"
														? "invalidCredentials"
														: "signup"
												}`}
												onSubmit={handleSubmit}
											>
												<h1>Get Started</h1>
												<div className="mb-3">
													<label
														htmlFor="userName"
														className="form-label"
													>
														Name
													</label>
													<input
														type="name"
														className="form-control"
														id="userName"
														name="userName"
														value={
															credentials.userName
														}
														onChange={onChange}
														required
														minLength={3}
														aria-describedby="name"
													/>
												</div>
												<div className="mb-3">
													<label
														htmlFor="email"
														className="form-label"
													>
														Email address
													</label>
													<input
														type="email"
														className="form-control"
														id="email"
														name="email"
														value={
															credentials.email
														}
														onChange={onChange}
														required
														aria-describedby="email"
													/>
												</div>
												<div className="mb-3">
													<label
														htmlFor="password"
														className="form-label"
													>
														Password
													</label>
													<input
														type="password"
														className="form-control"
														id="password"
														name="password"
														value={
															credentials.password
														}
														onChange={onChange}
														required
														minLength={5}
													/>
												</div>
												<div className="mb-3">
													<label
														htmlFor="cpassword"
														className="form-label"
													>
														Confirm Password
													</label>
													<input
														type="password"
														className="form-control"
														id="cpassword"
														name="cpassword"
														value={
															credentials.cpassword
														}
														onChange={onChange}
														required
														minLength={5}
													/>
												</div>
												<div className="row g-3 align-items-center">
													<div className="col-auto">
														<button
															type="submit"
															className="btn"
														>
															Submit
														</button>
													</div>
													<div className="col-auto">
														{spinner === true ? (
															<div className="loader">
																<div
																	className="spinner-border text-primary"
																	role="status"
																>
																	<span className="visually-hidden">
																		Waiting
																		for
																		server
																	</span>
																</div>
																Authenticating...
															</div>
														) : (
															alertText
														)}
													</div>
												</div>

												<div className="mb-3 link">
													<Link
														href="/Login"
														className="href-link"
													>
														Already have an account?
														Login
													</Link>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* <form className="container signup" onSubmit={handleSubmit}>
				<h1>Signup</h1>
				<div className="mb-3 mt-3">
					<label htmlFor="userName" className="form-label">
						Name
					</label>
					<input
						type="name"
						className="form-control"
						id="userName"
						name="userName"
						value={credentials.userName}
						onChange={onChange}
						aria-describedby="name"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						value={credentials.email}
						onChange={onChange}
						required
						aria-describedby="email"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						value={credentials.password}
						onChange={onChange}
						required
						minLength={5}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="cpassword" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						className="form-control"
						id="cpassword"
						name="cpassword"
						value={credentials.cpassword}
						onChange={onChange}
						required
						minLength={5}
					/>
				</div>
				<button type="submit" className="btn">
					Submit
				</button>
			</form> */}
		</>
	);
};

export default Signup;
