import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

const API_URL = "http://localhost:3000";

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    // allowing component to redirect user to different page after successful login
    const navigate = useNavigate();
    //importint AuthContext with contains authentication
    // allows auth methods to be accessed through hook
    const { storeToken, authenticateUser } = useContext(AuthContext);

    // function updates state variable in response to user input
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => { // trigerrred when user submits login form
        e.preventDefault();
        //Creating an object representing the request body
        const requestBody = { email, password };

        //sending POST req to API 
        axios.post(`${API_URL}/auth/login`, requestBody)
        .then((response) => {
            console.log(response);
            console.log("JWT token", response.data.authToken);
            // if req is succesful, auth token is saved in browsers local storage
            storeToken(response.data.authToken);
            // updates isAuthenticated state to true
            authenticateUser();
            // redirects user to the home page
            navigate("/");
        })
        // if req fails, error message is set using hook
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })

    };
    return (
        <div className="LoginPage">
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={handleEmail} />

            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={handlePassword} />
                
            <button type="submit">Login</button>
            </form>
            { errorMessage && <p className="error-message">{errorMessage}</p> }

            <p>Don't have an account yet?</p>
            <Link to={"/signup"}> Sign Up</Link>
        </div>
    )

}

export default LoginPage;
