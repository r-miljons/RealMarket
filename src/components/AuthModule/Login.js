import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import "./AuthModule.scss";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login, loading, error } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(username, password);
	};

	return (
		<div className="auth-container">
			<h3>Login</h3>
			<form onSubmit={handleSubmit}>
			<div className="input-wrapper">
				<label>Username</label>
				<input 
					type="text" 
					autoComplete="username" 
					value={username} 
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className="input-wrapper">
				<label>Password</label>
				<div className="password-wrapper">
					<input 
						type={showPassword ? "text" : "password"} 
						autoComplete="password" 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<span className="material-symbols-outlined"
                        title="Show Password"
                        onClick={() => setShowPassword(!showPassword)}
                    >{showPassword ? "visibility_off" : "visibility"}</span>
				</div>
			</div>
			<button className="orange-btn" disabled={loading}>Login</button>
			</form>
			{error && <div className="error">{error}</div>}
		</div>
	);
}
