const singleFormCollection = require('../../Modal/User/singleFormMadal')

exports.getUserForm = async (req, res) => {
    try {
        const form = await singleFormCollection.find({}).sort({_id:-1})
        res.status(200).send(form)
        
    } catch (error) {
        console.error("Error fetching form data:", error);
      res.status(500).send("Internal Server Error fetching form data");
    }
}


exports.uploadSingleForm = async (req, res) => {
    try {
        const {formState} = req.body
        if(!formState){
            return res.status(400).send({ msg: " fields are required." });

        }
        // const form = await singleFormCollection.find({})
        const form = new singleFormCollection({
            number:formState.number,
            email:formState.email,
            fullName:formState.fullName,
            productName:formState.productName,
            command:formState.command,

        })
        await form.save();
    } catch (error) {
        console.error(error,'Internal Server Error adding Single form');
        res.status(500).json({ error: 'Internal Server Error adding Single form' });
    }
}