import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

function NavBar(){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav>
            <Link to = "/">
                <button>Home</button>
            </Link>
            <Link to = "/events">
                <button>Events</button>
            </Link>

        {isLoggedIn && (
           <>
           <Link to = "/events/myEvents"><button>My Events</button></Link>
           <Link to = "/cars/myCars"><button>My Cars</button></Link>
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