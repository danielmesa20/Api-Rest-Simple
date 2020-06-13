const Commentary = require("../models/Commentary");

exports.getCommentarys = async (req, res) => {

    const { product_id } = req.body;

    try {
        const comments = await Commentary.find({ product_id });
        return res.status(200).json({ err: null, comments });
    } catch (err) {
        return res.status(400).json({ err: null });
    }
};


exports.addCommentary = async (req, res) => {
    
    const { body, user_id, product_id } = req.body;
   
    const newCommentary = new Commentary({
        body,
        user_id,
        product_id,
    });

    try {
        const commentary = await newCommentary.save();
        return res.status(200).json(commentary);
    } catch (err) {
        console.log("Error add: ",err);
        return res.status(400).json({ err });
    }
};