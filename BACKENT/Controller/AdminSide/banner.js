
const bannerCollection = require('../../Modal/Admin/bannerModal'); // Import your Mongoose model
const sharp = require('sharp')


// Fetch all banner
module.exports.getAllbanner = async (req, res) => {
    try {
      const banner = await bannerCollection.find({});
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

exports.create = async (req, res) => {
    const { name } = req.body;
    let videosPaths = [];
  
    if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
      for (let video of req.files.videos) {
        videosPaths.push("/" + video.path);
      }
    }
  
    try {
        const newBanner = new bannerCollection({
            bannerName: req.body.bannerName, // Use bannerInfo to access the banner name
            videos:videosPaths
        });

        await newBanner.save();

        const banner = await bannerCollection.find({});
        res.status(200).json({ details: banner, newBanner });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };