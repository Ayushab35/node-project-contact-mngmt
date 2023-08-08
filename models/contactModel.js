const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    name:{
        type: String,
        required : [true, "Please enter name"],
    },
    email:{
        type: String,
        required: [true, "Please enter email id"]
    },
    phone:{
        type: String,
        required: [true, "Please add the phone number"],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);