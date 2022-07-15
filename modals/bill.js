const mongoose=require('mongoose');
const billScheme = new mongoose.Schema({
    billDate: { type: Date ,required: true,unique: true,max:new Date()},
    billAmount: { type: Number ,required: true},
    paidDate: { type: Date ,max:new Date()},
    units: { type: String ,required: true},
    paid: { type: Boolean ,default: false}
}
);
module.exports = mongoose.model("bill", billScheme);

