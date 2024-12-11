import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: "",
        country: "",
        city: "",
        phone: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before new request

        try {
            await axios.post("http://localhost:8800/api/auth/register", credentials); // Update with your backend's register endpoint
            alert("Registration successful! You can now log in.");
            navigate("/login");
        } catch (err) {
            setError(
                err.response ? err.response.data.message : "Registration failed"
            );
        }
    };

    return (
        <div className="register">
            <div className="rContainer">
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="text"
                    placeholder="Country"
                    id="country"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="text"
                    placeholder="City"
                    id="city"
                    onChange={handleChange}
                    className="rInput"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    id="phone"
                    onChange={handleChange}
                    className="rInput"
                />
                <button onClick={handleClick} className="rButton">
                    Register
                </button>
                {error && <span className="errorMessage">{error}</span>}
            </div>
        </div>
    );
};

export default Register;
