const Student = require("../models/Student");
const cloudinary = require('cloudinary').v2;
async function addstudent(req, res) {
  try {
    let result;
    // console.log(req.body, "req.body");
    // console.log(req.file, "req.file...");
    if (req.file) {
      cloudinary.config({
        cloud_name: 'dngcup8db',
        api_key: '494721683742612',
        api_secret: 'CoNpPxVGtvQjXpCK10CyRaU36ps'
      })
      result = await cloudinary.uploader.upload(req.file.path);
      // console.log(result);
    }
    let student = new Student(req.body);
    if (req.file) {
      student.studentImage = result.secure_url;
    }
    // let student = new Student(req.body);
    // await student.save();
    await student.save();
    // console.log("student save sucessfully...");
    let students = await Student.find({});
    res.render("studentlist", {
      students: students,
    });
  } catch (err) {
    console.log(err);
  }
}

async function deletestudent(req, res) {
  try {
    let studentId = req.params._id;
    // console.log(studentId, "deletestudent");
    await Student.deleteOne({ _id: studentId });
    let students = await Student.find({});
    res.render("welcomeadmin", {
      students: students,
    });
  } catch (err) {
    console.log(err);
  }
}

async function openeditpage(req, res) {
  try {
    let studentId = req.params._id;
    let student = await Student.findOne({ _id: studentId });
    if (student) {
      // console.log(student);
      res.render("studenteditpage", {
        student: student,
      });
    } else {
      res.render("/");
    }
  } catch (err) {
    console.log(err);
  }
}
async function editStudent(req, res) {
  try {
    const editId = req.params._id;
    // console.log(editId);
    let student = await Student.findOne({ _id: editId });
    if (student) {
      // console.log(req.body);
      student.rollNo = req.body.rollNo;
      student.studentName = req.body.studentName;
      student.fatherName = req.body.fatherName;
      student.course = req.body.course;
      student.branch = req.body.branch;
      student.yearOfAddmission = req.body.yearOfAddmission;
      await student.save();
      let students = await Student.find({});
      res.render("welcomeadmin", {
        students: students,
      });
    } else {
      res.end("Student not found..");
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  addstudent,
  deletestudent,
  openeditpage,
  editStudent,
};