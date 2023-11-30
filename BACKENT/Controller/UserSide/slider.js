const sliderCollection = require('../../Modal/Admin/sliderModal')



// Fetch all slider


module.exports.getAllslider = async (req, res) => {
    try {
      const slider = await sliderCollection.find({}).sort({_id:-1})
      res.status(200).send(slider);
    } catch (error) {
      console.error("Error fetching slider:", error);
      res.status(500).send("Internal Server Error fetching slider");
    }
  }