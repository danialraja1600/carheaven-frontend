import {useState, useEffect} from "react";
import axios from "axios";
import CarCard from "../components/CarCard";

import AddCar from "../components/AddCar";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function MyCarsPage(){
    const [cars, setCars] = useState([]);
    /* creating variable and function setCars to update its value.
    initial state is an empty array */

    const getMyCars = () => { 
    /* local storage objects used to get token and ID which will be used
    as params in API call to authenticate req */
        const storedToken = localStorage.getItem('authToken');
        const storeUserId = localStorage.getItem("userId");

    /* cars are retrieved from server with API call using axios library*/
        axios
        .get(
            `${API_URL}/api/cars/myCars/${storeUserId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } } 
        )
        .then((response) => setCars(response.data))
        .catch((error) => console.log(error));
    };
    /* useEffect hook used to call function once component is set up */
    useEffect(() => {
        getMyCars();
    }, []);

    return (
    /* rendering child component that takes a prop set to a function */
        <div className="MyCarsPage">
                <AddCar refreshCars={getMyCars}/>
            { cars.map((car) => <CarCard key={car._id} {...car} /> )}
        </div>
    /* map method used to map over cars state array to then render 
    car card component for each car */
    )
    /* each car card is given a key set to cars unique ID */
}

export default MyCarsPage;