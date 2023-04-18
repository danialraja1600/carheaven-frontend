import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://car-heaven.adaptable.app";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    // allowing component to redirect user to different page after successful sign up
    const navigate = useNavigate();
    

    // function updates state variable in response to user input
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSignUpSubmit = (e) => { // trigerrred when user submits sign up form
        e.preventDefault();
        //Creating an object representing the request body
        const requestBody = { email, password, name };

        //sending POST req to API 
        axios.post(`${API_URL}/auth/signup`, requestBody)
        .then((response) => {
            // redirects user to the home page
            navigate("/login");
        })
        // if req fails, error message is set using hook
        .catch((error) => {
            console.log('err: ', error);
            const errorDescription = error.response.data.message;
            console.log('errorDescription: ', errorDescription);
            setErrorMessage(errorDescription);
        })

    };
    return (
        <div className="SignUpPage">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUpSubmit}>
            <label>Name: </label>
            <input type="text" name="name" value={name} onChange={handleName}/>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={handleEmail} />

            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={handlePassword} />
    
            <button type="submit">Sign Up</button>
            </form>
            { errorMessage && <p className="error-message">{errorMessage}</p> }

            <p>Already have an account created?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    )

}

export default SignUpPage;
