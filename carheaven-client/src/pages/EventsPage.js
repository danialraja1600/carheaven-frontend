import {useState, useEffect} from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const API_URL = "https://car-heaven.adaptable.app";

function EventsPage(){
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/api/events/getEvents`)
        .then((data) => { 
            console.log(data);
          setEvents(data?.data);
        })
        .catch((error) => console.log(error));
      }, []);
    console.log(events);
    return (
        <div className="EventsPage">
            { events.map((event) => <EventCard key={event._id} {...event} /> )}
        </div>
    );
}


export default EventsPage;
