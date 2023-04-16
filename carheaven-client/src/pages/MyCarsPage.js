import {useState, useEffect} from "react";
import axios from "axios";
import CarCard from "../components/CarCard";

const API_URL = "http://localhost:3000";

function MyCarsPage(){
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storeUserId = localStorage.getItem("userId");
        axios
        .get(
            `${API_URL}/api/cars/myCars/${storeUserId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }    
        )
        .then((data) => {
            console.log(data);
            setCars(data?.data);
        })
        .catch((error) => {console.log(error)});
    }, [])

    return (
        <div className="MyCarsPage">
            { cars.map((car) => <CarCard key={car._id} {...car} /> )}
        </div>
    )
}

export default MyCarsPage;