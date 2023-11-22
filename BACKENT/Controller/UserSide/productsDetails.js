const productsCollection =require('../../Modal/Admin/productsModal')



exports.getProductById = async (req, res) => {
    const { productId } = req.params;
//   console.log(productId,'productId')
    try {
      const product = await productsCollection.findById(productId);
      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).send("Internal Server Error fetching product details");
    }
  };

  // productSimilar.js

exports.getSimilarProducts = async (req, res) => {
  const { productId } = req.params;

  try {
    const currentProduct = await productsCollection.findById(productId);
    const similarProducts = await productsCollection.find({
      category: currentProduct.category,
      // Add other criteria for similarity based on your data model
    }).limit(5); // Limit the number of similar products as needed

    res.status(200).json(similarProducts);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).send("Internal Server Error fetching similar products");
  }
};
// productSimilar.js


// exports.getSimilarProducts = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const currentProduct = await productsCollection.findById(productId);
//     const similarProducts = await productsCollection.find({
//       _id: { $ne: productId }, // Exclude the current product
//       category: currentProduct.category,
//       // Add other criteria for similarity based on your data model
//     });

//     res.status(200).json(similarProducts);
//   } catch (error) {
//     console.error("Error fetching similar products:", error);
//     res.status(500).send("Internal Server Error fetching similar products");
//   }
// };
