import { Link } from "react-router-dom";

function EventCard ({ title, description, imageUrl, location, creator, status, _id}) {
return (
    <div className="EventCard card">
        <Link to = {`/events/${_id}`}>
            <h3>{title}</h3>
        </Link>
        <h4>Description:</h4>
        <p>{description}</p>
        <img src={imageUrl}/>
        <h4>Location:</h4>
        <p>{location}</p>
        <h4>Creator:</h4>
        <h4>{creator}</h4>
        <h4>{status}</h4>
    </div>
);
}

export default EventCard;
