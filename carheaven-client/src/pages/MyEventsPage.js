import {useState, useEffect} from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

import AddEvent from "../components/AddEvent";

const API_URL = "https://car-heaven.adaptable.app";


function MyEventsPage(){
    const [events, setEvents] = useState([]);
    /* creating variable and function seEvents to update its value.
    initial state is an empty array */
    const getMyEvents = () => {
    /* local storage objects used to get token and ID which will be used
    as params in API call to authenticate req */
        const storedToken = localStorage.getItem("authToken");
        const storeUserId = localStorage.getItem("userId");
        
        axios
        .get(
    /* events are retrieved from server with API call using axios library*/
            `${API_URL}/api/events/myEvents/${storeUserId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }    
        )
        .then((response) => setEvents(response.data))
        .catch((error) => console.log(error));
    };
    
    /* useEffect hook used to call function once component is set up */
    useEffect(() => {
        getMyEvents();
    }, []);
 
    return (
    /* rendering child component that takes a prop set to a function */
        <div className="MyEventsPage">
                <AddEvent refreshEvents={getMyEvents}/>
            { events.map((event) => <EventCard key={event._id} {...event} /> )}
        </div>
    /* map method used to map over events state array to then render 
    event card component for each event */
    )
}

export default MyEventsPage;
