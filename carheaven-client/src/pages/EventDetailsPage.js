import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = "https://car-heaven.adaptable.app";



function EventDetailsPage (props) {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  
  /* function makes Get req to API endpoint for specific event and updates
  the event state value */
  const getEvent = () => {
  /* making req using Axios */
    axios
      .get(
        `${API_URL}/api/events/${eventId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
  /* passing in the request header which includes a authorization
  header with a token */    
      )
  /* when req is succesful execute callback function */
      .then((response) => {
        const oneEvent = response.data;
  /* extracts data from the response obj and saves as variable */
        setEvent(oneEvent);
  /* updating state with new data */
      })
      .catch((error) => console.log(error));
  };
  
  /* whenever value in array of dependencies changes,
  function is called */ 
  useEffect(()=> {
    getEvent();
  /* calls getEvent function when component mounts */
  }, [] );

  /* function to delete event makes DELETE req to API endpoint
  which deletes a specific event */
  const deleteEvent = () => { 
    axios
      .delete(
        `${API_URL}/api/events/${eventId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
  /* navigates user to different page */
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