import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = "https://car-heaven.adaptable.app";


function CarDetailsPage (props) {
  const [car, setCar] = useState(null);
  const { carId } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  
  
  const getCar = () => {
    axios
      .get(
        `${API_URL}/api/cars/${carId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneCar = response.data;
        setCar(oneCar);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getCar();
  }, [] );

  const deleteCar = () => { 
    axios
      .delete(
        `${API_URL}/api/cars/${carId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
      .then(() => navigate("/cars/myCars"))
      .catch((err) => console.log(err));
  };

  
  return (
    <div className="CarDetails">
      {car && (
        <>
          <h1>{car.make}</h1>
          <p>{car.model}</p>
          <p>{car.year}</p>
          <p>{car.price}</p>
          <p>{car.description}</p>
          <p>{car.imageUrl}</p>

        </>
      )}

      <Link to={`/cars/edit/${carId}`}>
        <button>Update!</button>
      </Link>
        <button onClick={deleteCar}>Delete!</button>
      
    </div>
  );
}

export default CarDetailsPage;