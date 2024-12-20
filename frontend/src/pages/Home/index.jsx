import { useEffect, useState } from "react";
import { ProductElement, ProductCards } from "../../components/Product/productCard";
import axios from "axios";
import './home.css'

export default function Home() {

    const [products, setProducts] = useState([])

    const [searchValue, setSearchValue] = useState("")
    const [selectedOption, setSelectedOption] = useState("");


    useEffect( () => {
        axios.get("http://localhost:3001/products", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }}).then((response) => {
                setProducts(response.data)
            }).catch((error) => {  
                console.log(error)
            })

    }, [])

    const handleChangeSearch = (event) => {
        setSelectedOption(event.target.value);
      };

    const handleSearch = () => {
        let mySearch = ""

        if(selectedOption !== "") {
            mySearch = "?category=" + selectedOption + "&title=" + searchValue
        }

        if (searchValue === "") {
            mySearch = ""
        }
        console.log(mySearch)
        console.log(`http://localhost:3001/products${mySearch}`, "?category=cars&title=cozy")


        axios.get(`http://localhost:3001/products${mySearch}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }}).then((response) => {
                setProducts(response.data)
            }).catch((error) => {  
                console.log(error)
            })
    }

    return (
        <div className="homeContent">

            <div className="homeHeader">
                <select className="selectSearch" value={selectedOption} onChange={handleChangeSearch}>
                <option value="clothing">Clothing</option>
                    <option value="cars">Cars</option>
                    <option value="electronics">Electronics</option>
                    <option value="housing">Housing</option>
                    <option value="sportsLeisure">Sports and Leisure</option>
                    <option value="booksMedia">Books and Media</option>
                    <option value="jobsServices">Jobs and Services</option>
                    <option value="furniture">Furniture</option>
                </select>
                <input className="inputSearch" type="text" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)}/>
                <button className="btnSearch" onClick={handleSearch}>Search</button>
            </div>

            <p>All announces:</p>
            <div className="allAnnounceCards">
                {location.pathname.includes("/products") ? 
                    <ProductElement /> :
                    <ProductCards products={products} />
                }
            </div>
        </div>
    )
}