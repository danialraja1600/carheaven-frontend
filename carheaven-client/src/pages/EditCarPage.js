import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function EditCarPage(props) {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(""); 

    //used to navigate to different routes
    const navigate = useNavigate();
    // importing hook from react-router-dom
    const { carId } = useParams();
    //creating variable that is passed as param in URL

    const storedToken = localStorage.getItem('authToken');
    //getting auth token stored in local storage 

    // side-effect hook
    useEffect(() => {
    // triggered when page loads or CarId is changed
        

        axios
    // GET req to specific url with specific param
    // sends auth header containing auth token for the user
          .get(
            `${API_URL}/api/cars/${carId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          ) // promise executed when servers responds with req data
    // extracts car object from response and sets state variable
    // with values
          .then((response) => {
            const oneCar = response.data;
            setMake(oneCar.make);
            setModel(oneCar.model);
            setYear(oneCar.year);
            setPrice(oneCar.price);
            setDescription(oneCar.description);
            setImageUrl(oneCar.imageUrl);
          })
          .catch((error) => console.log(error));
        
      }, [carId]);
    
      const handleFormSubmit = (e) => {
    //function called when user submits form to update
    //prevents default form submission behaviour 
        e.preventDefault();
        const requestBody = {
    //creates a request body with the updated car properties
            make, 
            model,
            year,
            price,
            description,
            imageUrl,
        };

        axios
    //PUT req to update car with updated data
          .put(
            `${API_URL}/api/cars/${carId}`,
            requestBody,
            { headers: { Authorization: `Bearer ${storedToken}` } }
    /* passing in the request header which includes a authorization
  header with a token */ 
          )
          .then((response) => {
            navigate(`/cars/${carId}`)
          });
      };



      return (
        <div className="UpdateCar">
        <h3>Update your car - {make} {model}!</h3>
        <form className="update-form" onSubmit={(e) => handleFormSubmit(e)}>
        
        Make:
        <input
        type="text"
        name="make"
        value={make}
        placeholder="Enter the new make...." required
        onChange={(e) => setMake(e.target.value)}
        />
        
        
        Model:
        <input
        type="text"
        name="model"
        value={model}
        placeholder="Enter the new model...." required
        onChange={(e) => setModel(e.target.value)}
        />
        
        
        Year:
        <input
        type="number"
        name="year"
        value={year}
        placeholder="Enter the new year...." required
        onChange={(e) => setYear(e.target.value)}
        />
        
        
        Price:
        <input
        type="number"
        name="price"
        value={price}
        placeholder="Enter the new price...." required
        onChange={(e) => setPrice(e.target.value)}
        />
        
        
        Description:
        <textarea
        name="description"
        value={description}
        placeholder="Enter the new desription...." required
        onChange={(e) => setDescription(e.target.value)}
        />
        
        
        Image Url:
        <input
        type="text"
        name="imageUrl"
        value={imageUrl}
        placeholder="Enter the new Image Url...." required
        onChange={(e) => setImageUrl(e.target.value)}
        />
        
        <button type="Update!">Submit</button>
          </form>
        </div>
    );
    
};
        export default EditCarPage;