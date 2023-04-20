import {useState, useEffect} from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function EventsPage(){
    const [events, setEvents] = useState([]);
      /*useState function initializing empty variable
    using empty array */

    useEffect(() => {
      /*useEffect hook used to fetch data from API*/
        axios.get(`${API_URL}/api/events/getEvents`)
      /*method called to make GET req to API endpoint*/
        .then((data) => { 
          /*then method of axios promise used to update the
        state of the variable with the res data from API*/
            console.log(data);
          setEvents(data?.data);
        })
        .catch((error) => console.log(error));
      }, []);
    console.log(events);
    return (
      /* method used on cars array to loop through each and pass
        properties as object to carCard component*/
        <div className="EventsPage">
            { events.map((event) => <EventCard key={event._id} {...event} /> )}
        </div>
    );
      /*carCard recieves unique key prop based on cars id property*/
}


export default EventsPage;
