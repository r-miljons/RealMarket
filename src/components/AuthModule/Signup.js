import React, { useState } from "react";
import "./AuthModule.scss";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="auth-container">
			<h3>Sign Up</h3>
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
            <div className="input-wrapper">
				<label>Repeat Password</label>
				<input type="password" />
			</div>
			<button className="orange-btn">Sign Up</button>
		</div>
	);
}
