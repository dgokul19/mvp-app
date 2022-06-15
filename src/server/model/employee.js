const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employee_id : String,
    full_name: String,
    login_id : String,
    salary : String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employees', employeeSchema);