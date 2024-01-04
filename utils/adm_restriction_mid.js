// const jwt = require('jsonwebtoken');
// const adminRegModel = require('./../models/adminRegiMod');

// exports.permissionByAdmin = async (req, res, next) => {
//     try {
//         const authHeader = req.headers['authorization'];
//         const token = authHeader.split(' ')[1];
//         if (token) {
//             let result = jwt.decode(token);
//             let adminId = result._id;
//             const AdminData = await adminRegModel.findById({_id : adminId});  
//             if(!AdminData){
//                 res.status(403).json({message: "unauthorized!..",data: 0});
//             }else {
//                 res.status(200).json({ AdminData })
//             }
//         } else {
//             next();
//         }
//     } catch (err) {
//         res.status(500).json({ message: "invalid details!..." });
//     }
// }  