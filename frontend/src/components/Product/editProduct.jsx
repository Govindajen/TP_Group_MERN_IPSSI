import axios from "axios";
import { useEffect, useState } from "react";
import "./productCards.css";

import { useLocation, useNavigate } from "react-router-dom";

export default function ModifyAnnounce() {
    const Navigate = useNavigate();
    const location = useLocation();

    const [product, setProduct] = useState([]);
    const productId = new URLSearchParams(location.search).get("id"); // Extract ID from query string
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: 0,
        description: ""
    });

    useEffect(() => {
        // Fetch announce data
        axios.get(`http://localhost:3001/products${location.search}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((response) => {
            setFormData({
                title: response.data[0].title,
                category: response.data[0].category,
                price: response.data[0].price,
                description: response.data[0].description
            });
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    // Handle form input changes
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

            // If token doesn't exist, you can handle the error here
            if (!token) {
                alert("You must be logged in to modify an announcement.");
                return;
            }

            const response = await axios.put(`http://localhost:3001/products/${productId}`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            });

            if (response.data.result) {
                alert('Announcement Modified!');
                setFormData({
                    title: "",
                    category: "",
                    price: 0,
                    description: ""
                });
                Navigate('/home');
            }
        } catch (error) {
            console.error("Error modifying announcement:", error);
            alert("There was an error modifying the announcement.");
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-heading">Modify a Product</h1>
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
                        <option value="housing">Housing</option>
                        <option value="cars">Cars</option>
                        <option value="electronics">Electronics</option>
                        <option value="furniture">Furniture</option>
                        <option value="jobsServices">Jobs and Services</option>
                        <option value="clothing">Clothing</option>
                        <option value="sportsLeisure">Sports and Leisure</option>
                        <option value="booksMedia">Books and Media</option>
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
