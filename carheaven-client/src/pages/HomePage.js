import {useState, useEffect} from "react";
import axios from "axios";
import CarCard from "../components/CarCard";

const API_URL = "http://localhost:3000";

function HomePage(){
    const [cars, setCars] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/cars`)
        .then((data) => {
          console.log(data);
          setCars(data?.data);
        })
        .catch((error) => console.log(error));
      }, []);

    return (
        <div className="HomePage">
            { cars.map((car) => <CarCard key={car._id} {...car} /> )}
        </div>
    );
}


export default HomePage;