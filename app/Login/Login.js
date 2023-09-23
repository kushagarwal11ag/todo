"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserContext from "../Context/User/UserContext";
import "../Components/css/LoginSignup.css";

const Login = () => {
	const router = useRouter();
	const context = useContext(UserContext);
	const { userLogin } = context;

	const [alertText, setAlertText] = useState("");
	const [spinner, setSpinner] = useState(false);
	const [credentials, setCredentials] = useState({ email: "", password: "" });

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
		const userResponse = await userLogin(
			credentials.email,
			credentials.password
		);
		setCredentials({
			email: "",
			password: "",
		});
		if (userResponse.success) {
			setSpinner(false);
			setAlertText("Logged in successfully");
			localStorage.setItem("token", userResponse.authToken);
			router.push("/Home");
		} else {
			setSpinner(false);
			setAlertText("Invalid Credentials");
		}
	};
	return (
		<>
			<section className="vh-100" style={{ backgroundColor: "#fdf0d5" }}>
				<div className="container py-3 h-100">
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
											}}
										/>
									</div>
									<div className="col-md-6 col-lg-7 d-flex align-items-center">
										<div className="card-body p-4 p-lg-5">
											<form
												className={`container ${
													alertText ===
													"Invalid Credentials"
														? "invalidCredentials"
														: "login"
												}`}
												onSubmit={handleSubmit}
											>
												<h1>Welcome Back!</h1>
												<div className="form-outline mb-4">
													<label
														htmlFor="email"
														className="form-label"
													>
														Email address
													</label>
													<input
														type="email"
														className="form-control form-control-lg"
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
												<div className="form-outline mb-4">
													<label
														htmlFor="password"
														className="form-label"
													>
														Password
													</label>
													<input
														type="password"
														className="form-control form-control-lg"
														id="password"
														name="password"
														value={
															credentials.password
														}
														onChange={onChange}
														minLength={5}
														required
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
														href="/Signup"
														className="href-link"
													>
														Don't have an account?
														Sign up
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
		</>
	);
};

export default Login;
