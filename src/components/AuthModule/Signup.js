import React, { useState } from "react";
import "./AuthModule.scss";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const { signup, loading, error } = useSignup();
	const [passwordsMatch, setPasswordsMatch] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== repeatPassword) {
            setPasswordsMatch(false);
            return;
        } else if (password === repeatPassword) {
            setPasswordsMatch(true);
        }

		await signup(username, password);
	};

	return (
		<div className="auth-container">
			<h3>Sign Up</h3>
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
            <div className="input-wrapper">
				<label>Repeat Password</label>
				<input 
					type="password" 
					autoComplete="repeat password"
					value={repeatPassword}
					onChange={(e) => setRepeatPassword(e.target.value)}
				/>
			</div>
			<button className="orange-btn" disabled={loading}>Sign Up</button>
			</form>
			{!passwordsMatch && <div className="error">Passwords do not match</div>}
			{error && <div className="error">{error}</div>}
		</div>
	);
}
