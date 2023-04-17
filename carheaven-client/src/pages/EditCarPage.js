import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = "http://localhost:3000";

function EditCarPage(props) {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(""); 

    const navigate = useNavigate();
    const { carId } = useParams();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');

        axios
          .get(
            `${API_URL}/api/cars/${carId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          )
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
        e.preventDefault();
        const requestBody = {
            make, 
            model,
            year,
            price,
            description,
            imageUrl,
        };
        
        const storedToken = localStorage.getItem('authToken');

        axios
          .get(
            `${API_URL}/api/cars/${carId}`,
            requestBody,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          )
          .then((response) => {
            navigate(`/cars/${carId}`)
          });
      };
      const deleteCar = () => {
        const storedToken = localStorage.getItem('authToken');      

        axios
          .delete(
            `${API_URL}/api/cars/${carId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }           
          )
          .then(() => navigate("/cars/myCars"))
          .catch((err) => console.log(err));
      };  
    



      return (
        <div className="UpdateCar">
        <h3>Create A Car To Sell!</h3>
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
          <button onClick={deleteCar}>Delete Car!</button>
        </div>
    );
    
};
        export default EditCarPage;