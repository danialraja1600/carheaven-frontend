import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = "https://car-heaven.adaptable.app";



function EventDetailsPage (props) {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  
  
  const getEvent = () => {
    axios
      .get(
        `${API_URL}/api/events/${eventId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getEvent();
  }, [] );

  const deleteEvent = () => { 
    axios
      .delete(
        `${API_URL}/api/events/${eventId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
      .then(() => navigate("/events/myEvents"))
      .catch((err) => console.log(err));
  };

  
  return (
    <div className="EventDetails">
      {event && (
        <>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>{event.imageUrl}</p>
          <p>{event.location}</p>
          <p>{event.status}</p>

        </>
      )}

      <Link to={`/events/edit/${eventId}`}>
        <button>Update!</button>
      </Link>
        <button onClick={deleteEvent}>Delete!</button>
      
    </div>
  );
}

export default EventDetailsPage;