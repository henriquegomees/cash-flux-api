
const mongoose  = require('mongoose')
const timestamp = require('mongoose-timestamp')

const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

//Add created at and updated at
ExpenseSchema.plugin(timestamp)

module.exports = mongoose.model('Expense', ExpenseSchema)
