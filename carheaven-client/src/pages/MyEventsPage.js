import {useState, useEffect} from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

import AddEvent from "../components/AddEvent";

const API_URL = "http://localhost:3000";

function MyEventsPage(){
    const [events, setEvents] = useState([]);

    const getMyEvents = () => {
        const storedToken = localStorage.getItem("authToken");
        const storeUserId = localStorage.getItem("userId");
        
        axios
        .get(
            `${API_URL}/api/events/myEvents/${storeUserId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }    
        )
        .then((response) => setEvents(response.data))
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        getMyEvents();
    }, []);
 
    return (
        <div className="MyEventsPage">
                <AddEvent refreshEvents={getMyEvents}/>
            { events.map((event) => <EventCard key={event._id} {...event} /> )}
        </div>
    )
}

export default MyEventsPage;
