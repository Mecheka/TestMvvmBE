let mongoose = require('mongoose');

let programSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    time: { type: Number, required: true }
});

module.exports = mongoose.model("Programing", programSchema);