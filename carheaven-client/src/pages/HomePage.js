import {useState, useEffect} from "react";
import axios from "axios";
import CarCard from "../components/CarCard";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";


function HomePage(){
    const [cars, setCars] = useState([]);
    /*useState function initializing cars variable
    using empty array */

    /*useEffect hook used to fetch data from API*/
    useEffect(() => {
        axios.get(`${API_URL}/api/cars/getCars`)
        /*method called to make GET req to API endpoint*/
        .then((data) => { 
          console.log(data);
        /*then method of axios promise used to update the
        state of the variable with the res data from API*/
          setCars(data?.data);
        })
        .catch((error) => console.log(error));
      }, []);

    return (
        /*MAP METHOD - used on cars array to loop through each and pass
        properties as object to carCard component*/
        <div className="HomePage">
            { cars.map((car) => <CarCard key={car._id} {...car} /> )}
        </div>
        /*carCard recieves unique key prop based on cars id property*/
    );
}


export default HomePage;