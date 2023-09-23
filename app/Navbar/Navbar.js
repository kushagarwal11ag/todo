import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "../Context/User/UserContext";

const Navbar = (props) => {
	const router = useRouter();
	const context = useContext(UserContext);
	const { getUserDetails } = context;

	const [image, setImage] = useState(
		"data:image/png;base64,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"
	);

	const gotoHome = () => {
		router.push("/Home");
	};
	const gotoAccount = () => {
		router.push("/Account");
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		router.push("/Login");
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = await getUserDetails();
			setImage(data.image);
		};
		fetchData();
	}, []);
	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<ul className="navbar-nav">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle d-flex align-items-center"
								href="#"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<img
									src={image}
									className="rounded-circle"
									height="22"
									alt=""
									loading="lazy"
								/>
							</a>
							<ul
								className="dropdown-menu dropdown-menu-end"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<li>
									<a
										className="dropdown-item"
										onClick={
											props.title === "Home"
												? gotoHome
												: gotoAccount
										}
									>
										{props.title}
									</a>
								</li>
								<li>
									<a
										className="dropdown-item"
										onClick={handleLogout}
									>
										Logout
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
