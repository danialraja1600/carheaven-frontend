import {useState, useEffect} from "react";
import axios from "axios";
import CarCard from "../components/CarCard";

import AddCar from "../components/AddCar";

const API_URL = "http://localhost:3000";

function MyCarsPage(){
    const [cars, setCars] = useState([]);

    const getMyCars = () => {
        const storedToken = localStorage.getItem('authToken');
        const storeUserId = localStorage.getItem("userId");

        axios
        .get(
            `${API_URL}/api/cars/myCars/${storeUserId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } } 
        )
        .then((response) => setCars(response.data))
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        getMyCars();
    }, []);

    return (
        <div className="MyCarsPage">
                <AddCar refreshCars={getMyCars}/>
            { cars.map((car) => <CarCard key={car._id} {...car} /> )}
        </div>
    )
}

export default MyCarsPage;