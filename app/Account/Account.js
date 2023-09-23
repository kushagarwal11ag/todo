import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "../Context/User/UserContext";
import "../Components/css/Account.css";
import Navbar from "../Navbar/page";

const Account = () => {
	const router = useRouter();
	const context = useContext(UserContext);
	const { getUserDetails, editUser } = context;
	const [userDetails, setUserDetails] = useState({
		id: "",
		userName: "",
	});

	const [alertText, setAlertText] = useState("");
	const [spinner, setSpinner] = useState(false);
	const [credentials, setCredentials] = useState({
		id: "",
		userName: "",
		email: "",
		password: "",
		cpassword: "",
		image: "",
	});

	useEffect(() => {
		if (!localStorage.getItem("token")) router.push("/Login");
		const fetchData = async () => {
			const data = await getUserDetails();
			setCredentials((prevState) => ({
				...prevState,
				id: data._id,
				userName: data.name,
				email: data.email,
				image: data.image,
			}));
			setUserDetails({
				id: data._id,
				userName: data.name,
			});
		};
		fetchData();
	}, []);

	const convertToBase64 = (event) => {
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = () => {
			setCredentials({
				...credentials,
				[event.target.name]: reader.result,
			});
		};
		reader.onerror = () => {
			setAlertText("Error 415: Unsupported Media Type");
		};
	};

	const handleSubmit = useCallback(
		async (event) => {
			setSpinner(true);
			event.preventDefault();
			if (credentials.password !== credentials.cpassword) {
				setAlertText("Password mismatch");
				setCredentials((prevState) => ({
					...prevState,
					password: "",
					cpassword: "",
				}));
			} else {
				const userResponse = await editUser(
					credentials.id,
					credentials.userName,
					credentials.password,
					credentials.image
				);
				if (userResponse) {
					setAlertText("Account updated successfully");
					router.push("/Home");
				} else {
					setAlertText("An error occurred while updating details");
				}
			}
			setSpinner(false);
		},
		[credentials]
	);

	const onChange = useCallback(
		(event) => {
			setCredentials({
				...credentials,
				[event.target.name]: event.target.value,
			});
			setAlertText("");
		},
		[credentials]
	);

	const cancelChanges = useCallback(() => {
		setCredentials((prevState) => ({
			...prevState,
			userName: userDetails.userName,
			password: "",
			cpassword: "",
		}));
		router.push("/Home");
	}, [credentials]);

	return (
		<>
			<Navbar title={"Home"} />

			<form className="container account mt-2" onSubmit={handleSubmit}>
				<div className="header mt-3">
					<img id="img" src={credentials.image} />
					<h1>Profile</h1>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="userName" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="userName"
						name="userName"
						value={credentials.userName}
						onChange={onChange}
						minLength={3}
						required
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
						readOnly
						disabled
						aria-describedby="email"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						New Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						value={credentials.password}
						onChange={onChange}
						minLength={5}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="cpassword" className="form-label">
						Confirm New Password
					</label>
					<input
						type="password"
						className="form-control"
						id="cpassword"
						name="cpassword"
						value={credentials.cpassword}
						onChange={onChange}
						minLength={5}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="profileImage" className="form-label">
						Change Profile Image
					</label>
					<input
						accept="image/*"
						type="file"
						className="form-control"
						name="image"
						onChange={convertToBase64}
					/>
				</div>

				<div className="row g-3 align-items-center">
					<div className="col-auto">
						<button type="submit" className="btn">
							Submit
						</button>
					</div>
					<div className="col-auto">
						<button
							type="button"
							className="btn"
							onClick={cancelChanges}
						>
							Cancel Changes
						</button>
					</div>

					<div className="col-auto">
						{spinner === true ? (
							<span className="loader">
								<div
									className="spinner-border text-primary"
									role="status"
								>
									<span className="visually-hidden">
										Waiting for server
									</span>
								</div>
								Waiting for server
							</span>
						) : (
							alertText
						)}
					</div>
				</div>
			</form>
		</>
	);
};

export default Account;
