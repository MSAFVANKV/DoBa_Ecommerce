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