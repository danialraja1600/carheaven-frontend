import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = "http://localhost:3000";

function EditEventPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();
    const { eventId } = useParams();

    const storedToken = localStorage.getItem('authToken');

    useEffect(() => {
        

        axios
          .get(
            `${API_URL}/api/events/${eventId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          )
          .then((response) => {
            const oneEvent = response.data;
            setTitle(oneEvent.title);
            setDescription(oneEvent.description);
            setImageUrl(oneEvent.imageUrl);
            setLocation(oneEvent.location);
            setStatus(oneEvent.status);
          })
          .catch((error) => console.log(error));
        
      }, [eventId]);
    
      const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
            title, 
            description,
            imageUrl,
            location,
            status,
        };

        axios
          .put(
            `${API_URL}/api/events/${eventId}`,
            requestBody,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          )
          .then((response) => {
            navigate(`/events/${eventId}`)
          });
      };



      return (
        <div className="UpdateEvent">
        <h3>Update your Event - {title} !</h3>
        <form className="update-form" onSubmit={(e) => handleFormSubmit(e)}>
        
        Title:
        <input
        type="text"
        name="title"
        value={title}
        placeholder="Enter the new title...." required
        onChange={(e) => setTitle(e.target.value)}
        />
        
        
        Description:
        <textarea
        type="text"
        name="description"
        value={description}
        placeholder="Enter the new description...." required
        onChange={(e) => setDescription(e.target.value)}
        />
        
        
        Image:
        <input
        type="text"
        name="imageUrl"
        value={imageUrl}
        placeholder="Enter the new image...." required
        onChange={(e) => setImageUrl(e.target.value)}
        />
        
        
        Location:
        <input
        type="text"
        name="location"
        value={location}
        placeholder="Enter the new location...." required
        onChange={(e) => setLocation(e.target.value)}
        />
        
        
        Status:
        <textarea
        name="status"
        value={description}
        placeholder="Enter the new status...." required
        onChange={(e) => setStatus(e.target.value)}
        />
        
        <button type="Update!">Submit</button>
          </form>
        </div>
    );
    
};
        export default EditEventPage;