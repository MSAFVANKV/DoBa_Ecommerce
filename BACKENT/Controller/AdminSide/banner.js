
const bannerCollection = require('../../Modal/Admin/bannerModal'); // Import your Mongoose model

const sharp = require('sharp')


// Fetch all banner
module.exports.getAllbanner = async (req, res) => {
    try {
      const banner = await bannerCollection.find({}).sort({_id:-1})
      res.status(200).send(banner);
    } catch (error) {
      console.error("Error fetching banner:", error);
      res.status(500).send("Internal Server Error fetching banner");
    }
  }
  

module.exports.uploadBanner = async (req, res) => {
    console.log("here")
    try {
        const bannerInfo = req.body; 
        console.log(req.body,"banner");
        if (!req.files || !req.files['image']) {
            console.log("Image file is required");
            return res.status(400).json({ error: 'Image file is required.' });
        }
        
        const bannerImages = `${bannerInfo.bannerName}_DoBa_${Date.now()}.png`;
        // console.log(bannerInfo.bannerName,'bannerInfo.bannerName')
        
        await sharp(req.files['image'][0].buffer)
            .toFormat("png")
            .png({ quality: 100 })
            .toFile(`Public/banner/${bannerImages}`);
        

        const bannerCheck = await bannerCollection.findOne({ file: bannerImages });

        if (bannerCheck) {
        console.log("bannerCheck");

            const banner = await bannerCollection.find({});
            res.status(201).json({ details: banner });
        } else {
        console.log("newBanner");
            
            const newBanner = new bannerCollection({
                file: bannerImages,
                bannerName: req.body.bannerName, // Use bannerInfo to access the banner name
                color: req.body.color,
            });

            await newBanner.save();

            const banner = await bannerCollection.find({});
            res.status(200).json({ details: banner, newBanner });
        }

    } catch (error) {
        console.error(error,'Internal Server Error adding banner');
        res.status(500).json({ error: 'Internal Server Error adding banner' });
    }
}

module.exports.deleteBanner = async (req, res) => {
    const { _id } = req.params;

    if(!_id) {
        return res.status(400).send({ msg: "Product ID not provided." });
    }
    
    try {
        const banner = await bannerCollection.findByIdAndDelete(_id);

        if (!banner) {
            console.log('banner not found.');
            return res.status(404).send({ msg: "banner not found." });
        }
        console.log('Deleted successfully');
        res.send({ msg: 'Deleted successfully', banner });
    } catch (error) {
        console.error("Error deleting banner:", error);
        res.status(500).send({ error: error.message, msg: "Internal Server Error deleting banner" });
    }
}