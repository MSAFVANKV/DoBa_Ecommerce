const sliderCollection =require('../../Modal/Admin/sliderModal')
const sharp = require('sharp')


// Fetch all slider
module.exports.getAllslider = async (req, res) => {
    try {
      const slider = await sliderCollection.find({});
      res.status(200).send(slider);
    } catch (error) {
      console.error("Error fetching slider:", error);
      res.status(500).send("Internal Server Error fetching slider");
    }
  }
  


module.exports.uploadSlider = async (req, res) => {
    console.log("here")
    try {
        const sliderInfo = req.body; 
        console.log(req.body,"slider");
        if (!req.files || !req.files['image']) {
            console.log("Image file is required");
            return res.status(400).json({ error: 'Image file is required.' });
        }
        
        const sliderImages = `${sliderInfo.title}_DoBa_${Date.now()}.png`;
        // console.log(sliderInfo.sliderName,'sliderInfo.sliderName')
        
        await sharp(req.files['image'][0].buffer)
            .toFormat("png")
            .png({ quality: 100 })
            .toFile(`Public/Slider/${sliderImages}`);
        

        const sliderCheck = await sliderCollection.findOne({ file: sliderImages });

        if (sliderCheck) {
        console.log("sliderCheck");

            const slider = await sliderCollection.find({});
            res.status(201).json({ details: slider });
        } else {
        console.log("newslider");
            
            const newSlider = new sliderCollection({
                file: sliderImages,
                title: req.body.title, // Use sliderInfo to access the slider name
                description: sliderInfo.description, 

            });

            await newSlider.save();

            const slider = await sliderCollection.find({});
            res.status(200).json({ details: slider, newSlider });
        }

    } catch (error) {
        console.error(error,'Internal Server Error adding slider');
        res.status(500).json({ error: 'Internal Server Error adding slider' });
    }
}

module.exports.deleteSlider = async (req, res) => {
    const { _id } = req.params;

    if(!_id) {
        return res.status(400).send({ msg: "Product ID not provided." });
    }
    
    try {
        const product = await sliderCollection.findByIdAndDelete(_id);

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