const videoCollection = require('../../Modal/Admin/bannerVideos'); // Import your Mongoose model
const bannerCollection = require('../../Modal/Admin/bannerModal'); // Import your Mongoose model



// Fetch all banner


module.exports.getVideos = async (req, res) => {
    try {
      const videos = await videoCollection.find({});
      res.status(200).send(videos);
    } catch (error) {
      console.error("Error fetching banner:", error);
      res.status(500).send("Internal Server Error fetching banner");
    }
  }


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