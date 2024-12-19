const Product = require("../models/productModel");

const createProduct = async (req, res) => {
    const authorId = req.user.id; 
    
    try {
      const newProduct = new Product({
          ...req.body, 
          author: authorId, 
      });
      
      if (!newProduct.title || !newProduct.type || !newProduct.price || !newProduct.brand || !newProduct.model || !newProduct.km || !newProduct.year || !newProduct.description) {
          return res.status(400).send("Merci de remplir tous les champs");
        }
        
        await newProduct.save();
        
        
        res.status(201).send({ result: true, product: newProduct });
    } catch (error) {
        console.log(error.message)
      res.status(400).send({ error: error.message });
    }
  };

  const getProducts = async (req, res) => {
    try {
      const filter = {};
  
      if (req.query.brand) {
        filter.brand = { $regex: req.query.brand, $options: "i" };
      }
      if (req.query.model) {
        filter.type = { $regex: req.query.model, $options: "i" }; 
      }
      if (req.query.id) {
        filter._id = req.query.id; 
      }
  

      const products = await Product.find(filter).populate("author", "username email");
  
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.announceId);

        if(req.user.id !== product.author.toString()) {
          return res.status(403).send({ error: "You are not authorized to update this announcement" });
        }
    
        if (!product) {
          return res.status(404).send({ error: "Recette introuvable" });
        }
    
        // Check if the logged-in user (req.user) is the author of the announcement
        if (product.author.toString() !== req.user.id) {
          return res.status(403).send({ error: "You are not authorized to update this announcement" });
        }
    
        // If the user is authorized, update the announcement
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.productId,
          req.body,
          {
            new: true, // Return the updated document
          }
        );
    
        res.status(200).json({ result: true, announce: updatedProduct});
    
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};


const deleteProduct = async (req, res) => {

  const authorId = req.user.id;
  console.log('delete')
  
  try {
    
    const product = await Product.findById(req.params.productId);


    if (!product) {
      return res.status(404).send({ error: "Recette not found" });
    }


    if (product.author.toString() !== authorId) {
      return res.json({ result: false, error: "It's not your product, you can't DELETE" });
    }

    if (product.author.toString() === authorId) {
      
      const ProductToDelete = await Product.findByIdAndDelete(req.params.productId);
      if (!ProductToDelete) {
        return res.status(404).send({ error: "Product not found" });
      }
      res.status(200).send({ result: true, message: "Product deleted" });
    }


  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,

};
