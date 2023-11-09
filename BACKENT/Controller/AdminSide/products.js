const productsCollection =require('../../Modal/Admin/productsModal')
const sharp = require('sharp')


// Fetch all products
module.exports.getAllProducts = async (req, res) => {
    try {
      const products = await productsCollection.find({});
      res.status(200).send(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error fetching products");
    }
  }
  


module.exports.uploadFile = async (req, res) => {
    try {
        const productInfo = req.body; 
        console.log(req.body,"product");
        if (!req.files || !req.files['image']) {
            console.log("Image file is required");
            return res.status(400).json({ error: 'Image file is required.' });
        }
        
        const productImages = `${productInfo.productname}_DoBa_${Date.now()}.png`;
        // console.log(productInfo.productName,'productInfo.productName')
        
        await sharp(req.files['image'][0].buffer)
            .toFormat("png")
            .png({ quality: 100 })
            .toFile(`Public/ProductsImages/${productImages}`);
        

        const productCheck = await productsCollection.findOne({ file: productImages });

        if (productCheck) {
        console.log("productCheck");

            const products = await productsCollection.find({});
            res.status(201).json({ details: products });
        } else {
        console.log("newProduct");
            
            const newProduct = new productsCollection({
                file: productImages,
                productName: req.body.productName, // Use productInfo to access the product name
                price: productInfo.price, // Use productInfo to access the price
                category: productInfo.category, 
                description: productInfo.description, 

            });

            await newProduct.save();

            const products = await productsCollection.find({});
            res.status(200).json({ details: products, newProduct });
        }

    } catch (error) {
        console.error(error,'Internal Server Error adding products');
        res.status(500).json({ error: 'Internal Server Error adding products' });
    }
}

module.exports.deleteFile = async (req, res) => {
    const { _id } = req.params;

    if(!_id) {
        return res.status(400).send({ msg: "Product ID not provided." });
    }
    
    try {
        const product = await productsCollection.findByIdAndDelete(_id);

        if (!product) {
            console.log('Product not found.');
            return res.status(404).send({ msg: "Product not found." });
        }
        console.log('Deleted successfully');
        res.send({ msg: 'Deleted successfully', product });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ error: error.message, msg: "Internal Server Error deleting product" });
    }
}

// module.exports.editFile = async (req, res) => {
//     const { _id } = req.body;

//     try {
//         const updatedProduct = { ...req.body };

//         // Check if there's a new image file
//         if (req.files && req.files['image']) {
//             const productImage = `${updatedProduct.productName}_DoBa_${Date.now()}.png`;

//             await sharp(req.files['image'][0].buffer)
//                 .toFormat("png")
//                 .png({ quality: 100 })
//                 .toFile(`Public/ProductsImages/${productImage}`);

//             updatedProduct.file = productImage;
//         }

//         // Update the product
//         const product = await productsCollection.findByIdAndUpdate(_id, updatedProduct, {
//             new: true,
//         });

//         if (!product) {
//             console.log('Product not found.');
//             return res.status(404).send({ msg: 'Product not found.' });
//         }

//         console.log('Edited successfully');
//         res.send({ msg: 'Edited successfully', product });
//     } catch (error) {
//         console.error('Error editing product:', error);
//         res.status(500).send({ error: error.message, msg: 'Internal Server Error editing product' });
//     }
// };

  // Backend editFile route
module.exports.editFile = async (req, res) => {
    const { _id } = req.body;

    try {
        const updatedProduct = { ...req.body };

        // Check if there's a new image file
        if (req.files && req.files['image']) {
            const productImage = `${updatedProduct.productName}_DoBa_${Date.now()}.png`;

            await sharp(req.files['image'][0].buffer)
                .toFormat("png")
                .png({ quality: 100 })
                .toFile(`Public/ProductsImages/${productImage}`);

            updatedProduct.file = productImage;
        }

        // Update the product
        const product = await productsCollection.findByIdAndUpdate(_id, updatedProduct, {
            new: true,
        });

        if (!product) {
            console.log('Product not found.');
            return res.status(404).send({ msg: 'Product not found.' });
        }

        console.log('Edited successfully');
        res.send({ msg: 'Edited successfully', product });
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).send({ error: error.message, msg: 'Internal Server Error editing product' });
    }
};
