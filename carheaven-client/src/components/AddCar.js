import { useState } from "react";
import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";


function AddCar(props) {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(""); 

    // Handle form submission
const handleSubmit = (event) => { //triggered by the submit event of a form
    event.preventDefault(); //preventing default behaviour of the form

    const requestBody = {
        make,
        model,
        year,
        price,
        description,
        imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios //axios library used to make POST req to server with API url and 
      .post( 
        `${API_URL}/api/cars/createCar`,
        requestBody, //requestBody object
        { headers: { Authorization: `Bearer ${storedToken}` } }
        //attaching authToken to the Authorization header of the req
      )
      //resetting state variables to empty strings
      .then((response) => {
        setMake("");
        setModel("");
        setYear("");
        setPrice("");
        setDescription("");
        setImageUrl("");
        props.refreshCars();
        //function called and passed to component as a prop
      })
      .catch ((error) => console.log(error));
  };

return (
    <div className="CreateCar">
    <h3>Create A Car To Sell!</h3>
    <form className="car-form" onSubmit={(e) => handleSubmit(e)}>
    
    Make:
    <input
    type="text"
    name="make"
    value={make}
    placeholder="Enter the make...." required
    onChange={(e) => setMake(e.target.value)}
    />
    
    
    Model:
    <input
    type="text"
    name="model"
    value={model}
    placeholder="Enter the model...." required
    onChange={(e) => setModel(e.target.value)}
    />
    
    
    Year:
    <input
    type="number"
    name="year"
    value={year}
    placeholder="Enter the year...." required
    onChange={(e) => setYear(e.target.value)}
    />
    
    
    Price:
    <input
    type="number"
    name="price"
    value={price}
    placeholder="Enter the price...." required
    onChange={(e) => setPrice(e.target.value)}
    />
    
    
    Description:
    <textarea
    name="description"
    value={description}
    placeholder="Enter the description...." required
    onChange={(e) => setDescription(e.target.value)}
    />
    
    
    Image Url:
    <input
    type="text"
    name="imageUrl"
    value={imageUrl}
    placeholder="Enter the Image Url...." required
    onChange={(e) => setImageUrl(e.target.value)}
    />
    
    <button type="submit">Submit</button>
      </form>
    </div>
);
}

    export default AddCar;