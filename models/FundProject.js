const mongoose = require("mongoose");

const FundProjectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, "Title is too long"]
    }, 
    description:{
        type: String,
        required: [true, 'Please add a description'],
        trim: true,
        maxlength: [5000, "Description is too long"]
    }, 

    imageUrl:{
        type: String,
        required: [true, 'No image Url found'],
    },

    address:{
        type: String,
        required: [true, 'No Address found'],
    },

    endTime:{
        type: String,
        required: [true, 'Must specify end time'],
    },

    public_id:{
        type: String,
        required: [true, 'No public id found'],
    },

    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.models.FundProject || mongoose.model('FundProject', FundProjectSchema);