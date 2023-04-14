import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

function NavBar(){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav>
            <Link to = "/cars">
                <button>Home</button>
            </Link>

        {isLoggedIn && (
           <>
            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
            </>
        )}

        {!isLoggedIn && (
           <>
           <Link to = "/signup"><button>Sign Up</button></Link>
           <Link to = "/login"><button>Login</button></Link>
            </>
    
    )}
    </nav>
    )
}


export default NavBar;