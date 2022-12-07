import React, { useState } from "react";
import "./AuthModule.scss";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="auth-container">
			<h3>Login</h3>
			<div className="input-wrapper">
				<label>Username</label>
				<input type="text" />
			</div>
			<div className="input-wrapper">
				<label>Password</label>
				<div className="password-wrapper">
					<input type={showPassword ? "text" : "password"} />
					<span className="material-symbols-outlined"
                        title="Show Password"
                        onClick={() => setShowPassword(!showPassword)}
                    >{showPassword ? "visibility_off" : "visibility"}</span>
				</div>
			</div>
			<button className="orange-btn">Login</button>
		</div>
	);
}
