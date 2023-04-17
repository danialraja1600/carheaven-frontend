import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

function AddEvent(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [location, setLocation] = useState("");
    const [creator, setCreator] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const { carId } = props;
        const requestBody = {
            title,
            description,
            imageUrl,
            location,
            creator,
            status,
            carId,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios //axios library used to make POST req to server with API url and 
      .post( 
        `${API_URL}/api/events`,
        requestBody, //requestBody object
        { headers: { Authorization: `Bearer ${storedToken}` } }
        //attaching authToken to the Authorization header of the req
      )
      //resetting state variables to empty strings
      .then((response) => {
        setTitle("");
        setDescription("");
        setImageUrl("");
        setLocation("");
        setCreator("");
        setStatus("");
        props.refreshCars();
        //function called and passed to component as a prop
      })
      .catch ((error) => console.log(error));
  };

return (
    <div className="AddEvent">
    <h3>Create An Event!</h3>
    <form className="event-form" onSubmit={(e) => handleSubmit(e)}>
    
    Title
    <input
    type="text"
    name="title"
    value={title}
    placeholder="Enter the title...." required
    onChange={(e) => setTitle(e.target.value)}
    />
    
    
    Description: 
    <input
    type="text"
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
    placeholder="Enter the image url...." required
    onChange={(e) => setImageUrl(e.target.value)}
    />
    
    
    Location:
    <input
    type="text"
    name="location"
    value={location}
    placeholder="Enter the location...." required
    onChange={(e) => setLocation(e.target.value)}
    />
    <button type="submit">Create Event</button>
</form>
</div>);


}


export default  AddEvent;
