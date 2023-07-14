const { default: mongoose } = require("mongoose");
const Application = require("../models/Application");
const Faculty = require("../models/faculty");
const Internship = require("../models/internship");
const Student = require("../models/student");

exports.ApplyForIntern = async (req, res) => {
    try {
        let studentId = req.user._id;
        let internshipId = req.params.internshipId;
        console.log("InternshipId", internshipId);
        let { experience, whyHire } = req.body;

        let internshipOb = await Internship.findById(internshipId);
        console.log(studentId);

        const newApplication = new Application({
            facultyId: internshipOb.facultyId,
            internshipId: internshipId,
            experience: experience,
            whyHire: whyHire,
            studentId: studentId,
        });

        newApplication.save();

        return res.status(200).json({
            success: true,
            data: newApplication,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};

exports.appliedInterns = async (req, res) => {
    try {
        let { applicationId } = req.params.applicationId;

        const applied = await Application.find({ internshipId: applicationId });

        return res.status(200).json({
            success: true,
            data: applied,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};

exports.appliedInternships = async (req, res) => {
    try {
        let studentId  = req.user._id;
        
        const applied = await Application.find({ studentId: studentId });

        return res.status(200).json({
            success: true,
            data: applied,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};

exports.approveIntern = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const application = await Application.findOneAndUpdate(
            { _id: applicationId },
            { status: "Approved" }
        );

        return res.status(200).json({
            success: true,
            data: application,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};

exports.rejectIntern = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const application = await Application.findOneAndUpdate(
            { _id: applicationId },
            { status: "Rejected" }
        );

        return res.status(200).json({
            success: true,
            data: application,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};

exports.detailedApplication = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const application = await Application.findOne({ _id: applicationId });
        const student = await Student.findById(application.studentId);
        console.log("Appl", application);
        console.log(student);
        return res.status(200).json({
            success: true,
            data: application,
            student: student,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};

exports.facultyInterships = async (req, res) => {
    try {
        const facultyId = req.user.id;
        const application = await Application.find({ id: facultyId });

        return res.status(200).json({
            success: true,
            data: application,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};

exports.postInternship = async (req, res) => {
    try {
        const { email, name, stipend, minCGPA, description } = req.body.values;

        const faculty = await Faculty.findOne({ email: email });
        let facultyId;
        if (faculty) {
            facultyId = faculty._id;
        } else {
            return res.status(500).json({
                success: false,
                error: `incorrect email`,
            });
        }

        const internship = new Internship({
            facultyId: facultyId,
            stipend: stipend,
            minCGPA: minCGPA,
            name: name,
            description: description,
        });
        await internship.save();
        return res.status(200).json({
            success: true,
            data: internship,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};

exports.getAllAvaliableInternships = async (req, res) => {
    try {
        const internships = await Internship.find({});
        return res.status(200).json({
            success: true,
            data: internships,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};

exports.getDetailedIntershipDetails = async (req, res) => {
    try {
        const internshipId = req.params.internshipId;
        console.log(internshipId);
        const internship = await Internship.findById(internshipId);
        const faculty = await Faculty.findById(internship.facultyId);
        return res.status(200).json({
            success: true,
            data: internship,
            faculty: faculty,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`,
        });
    }
};
