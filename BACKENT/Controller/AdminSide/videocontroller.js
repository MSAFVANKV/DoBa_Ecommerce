const videoCollection = require('../../Modal/Admin/bannerVideos'); // Import your Mongoose model



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


  
exports.create = async (req, res) => {
    const bannerInfo = req.body; 
      let videosPaths = [];
      console.log(bannerInfo,"bannerInfo")
      console.log(videosPaths,"videosPaths")
  
    
      if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
        for (let video of req.files.videos) {
          videosPaths.push("/" + video.path);
        }
      }
    
      try {
          const newBanner = new videoCollection({
              videoName: bannerInfo.videoName, // Use bannerInfo to access the banner name
              videos:videosPaths
          });
  
          await newBanner.save();
  
          const banner = await videoCollection.find({});
          res.status(200).json({ details: banner, newBanner });
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
    };