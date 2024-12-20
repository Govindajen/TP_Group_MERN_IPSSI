import axios from "axios";
import { useEffect, useState } from "react";
import "./product.css";
import { useNavigate } from "react-router-dom";

export default function CreateAnnounce() {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    author: "", // Set from the logged-in user's ID
    title: "",
    price: 0,
    description: "",
    category: "", // Matches the updated schema
  });

  useEffect(() => {
    // Check if the user is logged in and fetch their ID
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.assign("/login");
    } else {
      // Simulate fetching the author ID from token or user info
      // Replace with actual user fetching logic
      const userId = "mockedUserId"; // Replace with actual logic to decode user ID
      setFormData((prevState) => ({ ...prevState, author: userId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create an announcement.");
        return;
      }

      const response = await axios.post("http://localhost:3001/product", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.result) {
        alert("Product created successfully!");
        setFormData({
          author: formData.author, // Retain the author ID
          title: "",
          price: 0,
          description: "",
          category: "",
        });
        Navigate("/home");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("There was an error creating the announcement.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">New product</h1>
      <form className="announce-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select a category</option>
            <option value="Housing">Housing</option>
            <option value="Cars">Cars</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Jobs and Services">Jobs and Services</option>
            <option value="Clothing">Clothing</option>
            <option value="Sports and Leisure">Sports and Leisure</option>
            <option value="Books and Media">Books and Media</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input"
          ></textarea>
        </div>


        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
