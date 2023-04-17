import {useState, useEffect} from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const API_URL = "http://localhost:3000";

function MyEventsPage(){
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storeUserId = localStorage.getItem("userId");
        axios
        .get(
            `${API_URL}/api/events/eventId/${storeUserId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }    
        )
        .then((data) => {
            console.log(data);
            setEvents(data?.data);
        })
        .catch((error) => {console.log(error)});
    }, [])

    return (
        <div className="MyEventsPage">
            { events.map((event) => <EventCard key={event._id} {...event} /> )}
        </div>
    )
}

export default MyEventsPage;
