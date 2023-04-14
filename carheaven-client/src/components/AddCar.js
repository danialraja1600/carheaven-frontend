import { useState } from "react";

function AddCar(props) {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(""); 

    // Handle form submission
const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
        make,
        model,
        year,
        price,
        description,
        imageUrl,
        createdAt: newDate().toString(),
        updatedAt: newDate().toString()
    };

    // Calling parent function add a new caf
    props.addNewCar(requestBody);
};

return (
    <div className="CreateCar">
    <h3>Create A Car To Sell!</h3>
    <form className="car-form" onSubmit={(e) => handleSubmit(e)}>
    
    Make:
    <input
    type="text"
    name="make"
    value={make}
    placeholder="Enter the make...." required
    onChange={(e) => setMake(e.target.value)}
    />
    
    
    Model:
    <input
    type="text"
    name="model"
    value={model}
    placeholder="Enter the model...." required
    onChange={(e) => setModel(e.target.value)}
    />
    
    
    Year:
    <input
    type="number"
    name="year"
    value={year}
    placeholder="Enter the year...." required
    onChange={(e) => setYear(e.target.value)}
    />
    
    
    Price:
    <input
    type="number"
    name="price"
    value={price}
    placeholder="Enter the price...." required
    onChange={(e) => setPrice(e.target.value)}
    />
    
    
    Description:
    <textarea
    name="description"
    value={description}
    placeholder="Enter the make...." required
    onChange={(e) => setDescription(e.target.value)}
    />
    
    
    Image Url:
    <input
    type="text"
    name="imageUrl"
    value={imageUrl}
    placeholder="Enter the Image Url...." required
    onChange={(e) => setImageUrl(e.target.value)}
    />
    
    <button type="submit">Submit</button>
      </form>
    </div>
);
}

    export default AddCar;