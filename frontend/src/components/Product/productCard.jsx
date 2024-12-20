import { useEffect, useState } from "react";
import "./productCards.css";
import { useLocation, useNavigate } from 'react-router';
import axios from "axios";


export function ProductElement () {
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const productId = new URLSearchParams(location.search).get("id"); // Extract ID from query string

  const user = localStorage.getItem("username");

  
  
  useEffect(() => {
  
    
    // Fetch announces data
    axios.get("http://localhost:3001/products", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    }).then((response) => {
      console.log(response.data)
      setProducts(response.data);
    }).catch((error) => {  
      console.log(error);
    });
  }, []);
  
  const product = products.find(product => product._id === productId);

  if (!product) {
    return (
      <p>Loading</p>
    )
  }
  

  // Handle delete operation
  const handleDelete = () => {
    if (!product) return;  // Ensure announce exists before making the request


    axios
      .delete(`http://localhost:3001/announce/${productId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.result) {
          alert("Announcement deleted");
          window.location.assign("/home");
        } else {
          alert(response.data.error);
        }
      });
  };



  // Handle case when announce is not found
  return (
    <div className="announceContainer">
      <div className="announceCardPage">
        <span className="announceHeader">
          <h1>{product.title}</h1>
          <h3>{product.category}</h3>
        </span>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Author:</strong> {product.author?.username}</p>
        <p className="descriptionChamp">{product.description}</p>
        {product.img_url && (
          <img src={product.img_url} alt={product.title} className="productImage" />
        )}
        <p><strong>Created At:</strong> {new Date(product.createAt).toLocaleDateString()}</p>
        <span className="buttonsCard">
          {
            (product.author.username === user) && (
              <>
              <button onClick={handleDelete} className="deleteAnnounceBtn">
                Delete Product
              </button>
              <button onClick={() => navigate(`/home/editproduct?id=${product._id}`)} className="deleteAnnounceBtn">
                Modify Product
              </button>
              </>

            )
          }
        </span>
      </div>
    </div>
  );
  
  
}

export function ProductCards({ products }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.assign("/login");
    }
  }, []);

  if (products.length === 0) {
    return <p>No Announcements available</p>;
  }

  return products.map((product, index) => {
    return (
      <div className="announceCard" key={index}>
        <span className="announceHeader">
          <h1>{product.title}</h1>
          <h3>{product.category}</h3>
        </span>
        <p><strong>Price:</strong> ${product.price}</p>
        {product.img_url && (
          <img src={product.img_url} alt={product.title} className="productThumbnail" />
        )}
        <p><strong>Author:</strong> {product.author?.username}</p>
        <p onClick={() => navigate(`/home/product?id=${product._id}`)} className="seemore">
          See more...
        </p>
      </div>
    );
  });
  
}
