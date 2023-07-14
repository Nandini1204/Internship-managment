const { findById } = require("../models/faculty")
const Faculty = require("../models/faculty")
const Student = require("../models/student")

exports.registerStudent = async (req, res) => {

    try {
        const { resume, phone, CGPA } = req.body.data
        console.log(req.body)
        const updatedUser = await Student.findOneAndUpdate({ 'email': req.user.email },
            {
                resume: resume,
                phoneNo: phone,
                CGPA: CGPA
            }
        )
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    err: err
                })
            })

        return res.status(200).json({
            success: true,
            user: updatedUser
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }

}


exports.registerFaculty = async (req, res) => {

    try {
        const { areaOfInterest, qualifications, website, phoneNo } = req.body

        await Faculty.findOneAndUpdate({ 'email': req.user.email },
            {
                areaOfInterest: areaOfInterest,
                qualifications: qualifications,
                website: website,
                phoneNo: phoneNo
            }
        )
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    err: err
                })
            })

        return res.status(200).json({
            success: true,
            user: req.user
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }

}

exports.getProfile = async (req, res) => {

    try {
        let userDetails;
        if (req.user.isStudent) {
            userDetails = await Student.findById(req.user._id);
        }
        else {
            userDetails = await Faculty.findById(req.user._id);
        }
        return res.status(200).json({
            success: true,
            user: userDetails
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: `Error occured user ${err}`
        })
    }
}