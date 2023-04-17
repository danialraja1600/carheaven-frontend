function EventCard ({ title, description, imageUrl, location, creator, status}) {
return (
    <div className="EventCard card">
        <h3>{title}</h3>
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
