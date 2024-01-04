const subjectModel = require("./../models/subjectModel");

exports.createSubDetails = async (req,res) => {
    try{
        const {subName, subCode, author} = req.body;
        let subject = await subjectModel.create({subName, subCode, author});
        res.status(201).json({message: "subject details created successfull!...", data: subject});
    }catch (err){
        res.status(500).json({message: "Your provided credentials is invalid!...", data: 0});
    }
}