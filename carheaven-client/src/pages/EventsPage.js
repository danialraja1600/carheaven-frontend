import {useState, useEffect} from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const API_URL = "http://localhost:3000";

function EventsPage(){
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/event`)
        .then((data) => { 
            console.log(data);
          setEvents(data?.data);
        })
        .catch((error) => console.log(error));
      }, []);

    return (
        <div className="EventsPage">
            { events.map((event) => <EventCard key={event._id} {...event} /> )}
        </div>
    );
}


export default EventsPage;
