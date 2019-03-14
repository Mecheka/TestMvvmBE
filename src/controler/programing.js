let mongoose = require('mongoose');
const Programing = require("../model/programing");

exports.gerPrograming = async (req, res, next) => {
    var programingId = req.params.programingId;
    if (!productId) {
        return res.status(400).json({
            message: "Request Id"
        });
    }

    Programing.findOne({ _id: programingId })
        .exec()
        .then(docs => {
            res.status(200).json({
                status: "true",
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                status: "false",
                error: err.message
            });
        });
    return res;
}