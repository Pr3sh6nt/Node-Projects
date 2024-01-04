const studentModel = require('../models/stuRegiMod');
const bcrypt = require("bcrypt");
const authToken = require("../utils/auth");


exports.signUp = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let Student = await studentModel.find({ email: email });
    if (Student.length != 0) {
      res.status(401).json({ message: "Student already exist!...", data: 0 });
    } else {
      let StudentInfo = await studentModel.create({ name, email, password: hashedPassword, role });
      res.status(201).json({ message: "Students created!...", data: StudentInfo });
    }
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password, } = req.body;
    const Student = await studentModel.findOne({ email: email });
    if (!Student) {
       res.status(401).json({ message: "Invalid email or password", data: 0 });
    } else {
      const isMatch = await bcrypt.compare(password, Student.password);
      if (isMatch) {
        let token = authToken.generatetoken({
          _id: Student._id,
          name: Student.name,
          email: Student.email,
          password: Student.password,
          role: Student.role
        });
        res.status(202).json({ message: "Student loggedIn SuccessFull!...", isSuccess: true , token:token});
      }
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}


exports.getStudentDetail = async (req, res) => {
  try{
    //let _id = req.params;
    let Student = await studentModel.find({});
    res.status(200).json({message: "Student details fetched successfully!..", data: Student});
  }catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.updateStudentDetail = async (req, res) => {
  try{
      const studentUpdate = await studentModel.updateOne(
          req.params,
          {
              $set: req.body
          }
      );
      res.status(202).json({message: "student details updation successfull!...", data: studentUpdate});
  }catch (err) {
      res.status(500).json({ err: err.message }); 
  }
}

exports.deleteStudentDetail = async (req, res) => {
  try{
      let {_id} = req.params;
      const student = await studentModel.deleteOne({id: _id});
      res.json({message: "student details successfully deleted!...", data : student});
  }catch (err) {
      res.status(500).json({ err: err.message }); 
  }
}

