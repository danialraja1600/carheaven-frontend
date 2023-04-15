import { Link } from "react-router-dom";

function CarCard ({make, model, year, price, description, imageUrl, user, createdAt, updatedAt, _id}) {
    return (
        <div className = "CarCard card">
            <Link to = {`/cars/${_id}`}>
                <h1>{make} {model}</h1>
            </Link>
            <span>Year : {year}</span>
            <span>Price : {price}</span>
            <p style={{ maxWidth: "400px" }}>Description : {description} </p>
            <span>Image : {imageUrl}</span>
            <span>Created On : {createdAt}</span>
            <span>Last Updated On : {updatedAt}</span>
        </div>
    );
}

export default CarCard;