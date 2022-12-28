import React, { useEffect, useState } from "react";
import mailDrawing from "../../assets/mail-big.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./ConfigureAccount.scss";

export default function ConfigureAccount() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const {user} = useAuthContext();

    useEffect(() => {
        // get details from db
        async function getData() {
			
			const response = await fetch(process.env.REACT_APP_SERVER_URL + "/users/" + user.id);
			const data = await response.json();

			if (response.ok) {
				// TODO: handle success
                data.data.email && setEmail(data.data.email);
                data.data.phone && setPhone(data.data.phone);
			} else if (!response.ok) {
				console.log(data)
				setError(data.error);
			}
		}
		
        try {
            getData();
        } catch (err) {
            setError(err.message);
        }
    }, [user.id]);

    function handleSubmit(e) {
        e.preventDefault();
        error && setError("");
		async function sendData() {
			
			const response = await fetch(process.env.REACT_APP_SERVER_URL + "/users/" + user.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${user.token}`
				},
				body: JSON.stringify({
					email,
                    phone
				})
			});
			const data = await response.json();

			if (response.ok) {
                console.log(data)
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
			} else if (!response.ok) {
				console.log(data)
				setError(data.error);
			}
		}
		sendData();
    };

	return (
		<section className="configure-account" id="configure-account">
			<h2>Configure Account</h2>
			<div className="container">
                <div className="left">
                    <p>Add contact details so buyers can hit you up.</p>
                    <form onSubmit={handleSubmit}>
                        <div className=""></div>
                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label>Email</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        <div className="save-container">
                            <button className="gradient-btn">Save</button>
                            {success && <span className="material-symbols-outlined">
                                check_circle
                            </span>}
                            {error && <div className="error">{error}</div>}
                        </div>
                    </form>
                </div>
				<div className="right">
                    <img src={mailDrawing} alt="mail letters" />
                </div>
			</div>
		</section>
	);
}
