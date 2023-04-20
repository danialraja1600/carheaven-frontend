import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";


function CarDetailsPage (props) {
  const [car, setCar] = useState(null);
  const [ownCar, setOwnCar] = useState(false);
  /*destructured to store the current state value and a function to update the state */
  const { carId } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const storeUserId = localStorage.getItem('userId');
  const navigate = useNavigate();
  
  /* function makes Get req to API endpoint for specific snd updates
  the car state value */
  const getCar = () => {
    axios
      .get(
        `${API_URL}/api/cars/${carId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
  /* passing in the request header which includes a authorization
  header with a token */     
      )
      .then((response) => {
        const oneCar = response.data;
        if(storeUserId === oneCar.user) {
          setOwnCar(true);
        }
  /* extracts data from the response obj and saves as variable */
        setCar(oneCar);
  /* updating state with new data */
      })
      .catch((error) => console.log(error));
  };
  
  /* whenever value in array of dependencies changes,
  function is called */
  useEffect(()=> {
    getCar();
  /* calls getCar function when component mounts */
  }, [] );

  /* function to delete car makes DELETE req to API endpoint
  which deletes a specific car */
  const deleteCar = () => { 
    axios
      .delete(
        `${API_URL}/api/cars/${carId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
  /* navigates user to different page */
      .then(() => navigate("/cars/myCars"))
      .catch((err) => console.log(err));
  };

  
  return (
    <div className="CarDetails">
      {car && (
        <>
        <form>
          <h1>{car.make}</h1>
          <p>Model : {car.model}</p>
          <p>Year : {car.year}</p>
          <p>Price : {car.price}</p>
          <p>Description : {car.description}</p>
          <img src ={car.imageUrl} alt="ImageUrl"/>
        </form>

        </>
      )}

      {ownCar && (
        <>
      <Link to={`/cars/edit/${carId}`}>
        <button>Update!</button>
      </Link>
        <button onClick={deleteCar}>Delete!</button>
      </>
      )}  

      
    </div>
  );
}

export default CarDetailsPage;