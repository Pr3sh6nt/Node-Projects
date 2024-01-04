var express = require('express');
var router = express.Router();

const adminCTRL = require("./../controllers/adminRegController");
const studentCTRL = require("./../controllers/studentRegController");
const subjectCTRL = require("./../controllers/subjectController");
const teacherCTRL = require("./../controllers/teacherRegController");


const { isAuthentication } = require('./../utils/auth');
//const {permissionByAdmin} = require('./../utils/adm_restriction_mid');


// STUDENT ROUTER
router.post('/CreateStudent', studentCTRL.signUp);
router.post('/StudentLogin', studentCTRL.login);
router.post('/getStudentDetails/:id', studentCTRL.getStudentDetail);
router.post('/updateStudent/:_id', studentCTRL.updateStudentDetail);
router.post('/deleteStudent/:id', studentCTRL.deleteStudentDetail);


// TEACHER ROUTER
router.post('/CreateTeacher', teacherCTRL.signUp);
router.post('/TeacherLogin', teacherCTRL.login);
router.post('/getTeacherData/:id', teacherCTRL.getTeacherDetails);
router.post('/updateTeacher/:_id', teacherCTRL.updateTeacherDetail);
router.post('/deleteStudent/:id', teacherCTRL.deleteTeacherDetail);



// ADMIN ROUTER
router.post('/CreateAdmin', adminCTRL.signUp);
router.post('/AdminLogin', adminCTRL.login);
router.post('/getAdminData', adminCTRL.getAdminDetails);
router.post('/AdminUpdation/:_id', adminCTRL.updateAdminDetail);
router.post('/deleteAdminDetail/:id', adminCTRL.deleteAdminDetail);
router.post('/getGroupofAdminData', adminCTRL.getgroupOfData);
router.post('/queryMultipleDocument', adminCTRL.queryMultipleDocument);
router.post('/matchAggregate', adminCTRL.matchAggregate);
router.post('/deleteAdminInfo', adminCTRL.deleteAdminDetail);
router.post('/findunique', adminCTRL.queryInUniqueness);
router.post('/countDocs', adminCTRL.countAdminDocs);
router.post('/hashAdmin', adminCTRL.findExistedAdmin);
router.post('/getAdminDetail', adminCTRL.getAdminDetail);
router.post('/findAdminById/:_id', adminCTRL.findAdminDetail);
router.post('/findAdminAndDelete/:_id', adminCTRL.findAdminDetailAndDelete);
router.post('/findadminDetailAndUpdate/:_id', adminCTRL.findAdminAndUpdate);
router.post('/findAdAndDelete', adminCTRL.findAdminthenDelete);
router.post('/findAdminAndReplace', adminCTRL.findAdminAndReplace);
router.post('/findadminDetailsAndUpdate', adminCTRL.findAdminAndUpdate)
//router.post('/hydrateAminInfo', adminCTRL.hydrateAdminData);
//router.post('/insertMultiAdminDetails', adminCTRL.addMultipleAdmins);
router.post('/replaceAdminDetails', adminCTRL.adminReplace);
router.post('/updateAdminDetails', adminCTRL.updateAllAdminDetails)


// SUBJECT ROUTER
router.post('/CreateSubject', subjectCTRL.createSubDetails);



module.exports = router;
