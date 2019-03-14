let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Programing = require('../model/programing');

router.get('/:programId', (req, res, next) => {
    var programingId = req.params.programId;
    if (!programingId) {
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
});
//jj

router.post('/', (req, res, next) => {
    const program = new Programing({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        time: req.body.time
    });

    program.save()
        .then(docs => {
            res.status(200).json({
                status: "true",
                data: docs
            });
        }).catch(err => {
            res.status(500).json({
                status: "false",
                error: err.message
            })
        });
});

router.put('/:programId', (req, res, next) => {
    const programId = req.params.programId;
    Programing.update({ _id: programId }, {
        $set: {
            name: req.body.newName,
            time: req.body.newTime
        }
    }).exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json({
                status: "true",
                data: docs
            });
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json({
                status: "false",
                error: err.message
            });
        });
});

router.delete('/:programId', (req, res, next) => {
    const programId = req.params.programId;
    Programing.remove({ _id: programId})
        .exec()
        .then(docs => {
            res.status(200).json({
                status: "true",
                data: docs
            });
        }).catch(err => {
            res.status(400).json({
                status: "false",
                error: err.message
            });
        });
});

module.exports = router;