const teacherModel = require('./../models/teachRegiMod');
const bcrypt = require("bcrypt");
const authToken = require("../utils/auth");


exports.signUp = async (req,res) => {
    try {
        const { name, email, password, role, student_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let Teacher = await teacherModel.find({ email: email });
        if (Teacher.length != 0) {
          res.status(401).json({ message: "Teacher already exist!...", data: 0 });
        } else {
          let TeacherInfo = await teacherModel.create({ name, email, password: hashedPassword, role, student_id });
          res.status(201).json({ message: "Students created!...", data: TeacherInfo });
        }
      } catch (err) {
        res.status(500).json({ err: err.message })
      }
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const Teacher = await teacherModel.findOne({ email: email });
      if (!Teacher) {
         res.status(401).json({ message: "Invalid email or password", data: 0 });
      } else {
        const isMatch = await bcrypt.compare(password, Teacher.password);
        if (isMatch) {
          let token = authToken.generatetoken({
            _id: Teacher._id,
            name: Teacher.name,
            email: Teacher.email,
            password: Teacher.password,
            student_id: Teacher.student_id
          });
          res.status(202).json({ message: "Teacher loggedIn SuccessFull!...", isSuccess: true , token:token});
        }
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
}

exports.getTeacherDetails = async (req,res) => {
    try{
        let {_id} = req.params;
        const teacher = await teacherModel.findOne({id : _id});
        res.status(200).json({message : "teacher detail fetched!...", data: teacher});
    }catch (err) {
        res.status(500).json({ err: err.message });
    }
}

exports.updateTeacherDetail = async (req, res) => {
  try{
      const teacherUpdate = await teacherModel.updateOne(
          req.params,
          {
              $set: req.body
          }
      );
      res.status(202).json({message: "teacher details updation successfull!...", data: teacherUpdate});
  }catch (err) {
      res.status(500).json({ err: err.message }); 
  }
}

exports.deleteTeacherDetail = async (req, res) => {
  try{
      let {_id} = req.params;
      const teacherDelete = await teacherModel.deleteOne({id: _id});
      res.json({message: "teacher details successfully deleted!...", data : teacherDelete});
  }catch (err) {
      res.status(500).json({ err: err.message }); 
  }
}