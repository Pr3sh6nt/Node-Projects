const adminRegModel = require('./../models/adminRegiMod');
//const stuRegiModel = require('./../models/stuRegiMod');
//const teacherRegModel = require('./../models/teachRegiMod');

const bcrypt = require("bcrypt");
const authToken = require("../utils/auth");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let Admin = await adminRegModel.find({ email: email });
    if (Admin.length != 0) {
      res.status(401).json({ message: "Admin already exist!...", data: 0 });
    } else {
      let AdminInfo = await adminRegModel.create({name, email, password : hashedPassword , role});
      res.status(201).json({ message: "Admin created!...", data: AdminInfo });
    }
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Admin = await adminRegModel.findOne({ email: email });
    if (!Admin) {
      res.status(401).json({ message: "Invalid email or password", data: 0 });
    } else {
      const isMatch = await bcrypt.compare(password, Admin.password);
      if (isMatch) {
        let token = authToken.generatetoken({
          _id: Admin._id,
          name: Admin.name,
          email: Admin.email,
          password: Admin.password,
          role: Admin.role
        });
        res.status(202).json({ message: "Admin loggedIn SuccessFull!...", isSuccess: true, token: token });
      }
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.getAdminDetails = async (req, res) => {
  try {
    const admin = await adminRegModel.findOne(req.body);
    res.status(200).json({ message: "admin detail fetched!...", data: admin });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.updateAdminDetail = async (req, res) => {
  try {
    const adminUpdate = await adminRegModel.updateOne(
      req.params,
      {
        $set: req.body
      }
    );
    res.status(202).json({ message: "admin details updation successfull!...", data: adminUpdate });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.deleteAdminDetail = async (req, res) => {
  try {
    let { _id } = req.params;
    const admin = await adminRegModel.deleteOne({ id: _id });
    res.json({ message: "admin details successfully deleted!...", data: admin });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.getgroupOfData = async (req, res) => {
  try {
    const admin = await adminRegModel.aggregate([{ $group: { _id: "$name", names: { $push: "$email" } } }]);
    res.status(200).json({ message: "admin details fetched!...", data: admin });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.createColection = async (req, res) => {
  const { name, email, password, role } = req.body;
  let user = await adminRegModel({ name, email, password, role });
  const userData = user.createCollection();
  res.status(201).json({ message: "collection created!...", data: userData });
}


exports.queryMultipleDocument = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await adminRegModel.bulkWrite([
      {
        insertOne: {
          document: {
            name, email, password, role
          }
        }
      },
      {
        updateOne: {
          filter: req.body,
          update: { $set: req.body }
        }
      }
    ]);
    res.status(200).json({ message: "bulkwrite working done!..", data: user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.matchAggregate = async (req, res) => {
  try {
    const admin = await adminRegModel.aggregate([
      { $match: req.body },
    ]);
    res.status(200).json({ message: "name matched!...", data: admin });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.deleteAdminDetails = async (req, res) => {
  try {
    const adminDetails = await adminRegModel.deleteMany(
      req.body
    );
    res.status(200).json({ message: "admin deleted..", data: adminDetails });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.deleteAdminDetail = async (req, res) => {
  try {
    const adminDetail = await adminRegModel.deleteOne(
      req.body
    );
    res.status(200).json({ message: "admin deleted..", data: adminDetail });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.queryInUniqueness = async (req, res) => {
  try {
    const adminDetail = await adminRegModel.distinct("name");
    res.status(200).json({ message: "admin deleted..", data: adminDetail });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.countAdminDocs = async (req, res) => {
  try {
    const adminDocs = await adminRegModel.estimatedDocumentCount();
    res.status(200).json({ message: "admin Docs counted!..", data: adminDocs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.findExistedAdmin = async (req, res) => {
  try {
    const adminDocs = await adminRegModel.exists(req.body);
    res.status(200).json({ message: "admin detail fetched!..", data: adminDocs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.getAdminDetail = async (req, res) => {
  try {
    const adminDocs = await adminRegModel.find(req.body);
    res.status(200).json({ message: "admin detail fetched!..", data: adminDocs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.findAdminDetail = async (req, res) => {
  try {
    const _id = req.params;
    const adminDocs = await adminRegModel.findById(_id);
    res.status(200).json({ message: "admin detail fetched!..", data: adminDocs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.findAdminDetailAndDelete = async (req, res) => {
  try {
    const id = req.params;
    const adminDocs = await adminRegModel.findByIdAndDelete(id);
    res.status(200).json({ message: "admin details deleted!..", data: adminDocs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.findAdminAndUpdate = async (req, res) => {
  try {
    const id = req.params;
    const adminDocs = await adminRegModel.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json({ message: "admin details updated!..", data: adminDocs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.findAdminthenDelete = async (req, res) => {
  try {
    const adminDocs = await adminRegModel.findOneAndDelete(req.body);
    res.status(200).json({ message: "admin details deleted!..", data: adminDocs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.findAdminAndReplace = async (req, res) => {
  try {
    const adminDocs = await adminRegModel.findOneAndReplace(req.body);
    res.status(200).json({ message: "admin details replaced!..", data: adminDocs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.findAdminAndUpdate = async (req, res) => {
  try {
    const adminDocs = await adminRegModel.findOneAndUpdate({ name: "Rahfghmehjghjshfghh" }, { $set: req.body });
    res.status(200).json({ message: "admin details update!..", data: adminDocs });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

// exports.hydrateAdminData = async (req,res) => {
//   try {
//     const adminData = req.body;
//     const admin =  adminRegModel.hydrate(adminData);
//     const adm = await admin.save();
//     res.status(200).json({ message: "admin details update!..", data: adm });
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// }

// exports.addMultipleAdmins = async (req,res) => {
//   try {
//     const [{name, email, password, role}] = req.body;
//     //console.log(req.body);
//     console.log(name, email, password, role);
    
//     //const admin = await adminRegModel.insertMany([{name, email, password, role},{name, email, password, role}]);
//     //await admin.save();
//     //res.status(200).json({ message: "admin details update!..", data: admin });
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// }

exports.adminReplace = async (req,res) => {
  try{
    const id = req.params;
    const admin = await adminRegModel.replaceOne({name : "Rameshfghh"}, {name : req.body.name});
    res.status(202).json({message: "admin replaced!...",data: admin});
  }catch(err){
    res.status(500).json({ err: err.message });
  }
}

exports.applySessionOnAdmin = async (req,res) => {
  try{
    const docs = await adminRegModel.startSession();
    let user = await adminRegModel.findOne({name : req.body.name}, { docs });
    res.status(200).json({message : "session apply on admin!...", data : user});
  }catch (err) {
    res.status(500).json({ err: err.message });
  }
}

exports.updateAllAdminDetails = async (req,res) => {
  try{
    const admin = await adminRegModel.updateMany({password : "123654"},{$set : req.body});
    res.status(200).json({message : "adminDetails updated!...",data : admin})
  }catch (err) {
    res.status(500).json({ err: err.message });
  }
}
