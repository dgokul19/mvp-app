const Employees = require('../model/employee');

const updateEmployee = (req, callback) => {
    const { employee_id } = req.params;
    console.log({employee_id});
    if(!employee_id) return callback(`No employee id found !!`)
    const { full_name, login_id, salary } = req.body;
    const options = {
        full_name,
        login_id,
        salary,
    };
    Employees.findOneAndUpdate({ employee_id: employee_id }, options, { upsert: true }, function (err, status) {
        if (err) return callback(err);
        callback(null, status);
    });
};

const deleteEmployee = (req, callback) => {
    const { employee_id } = req.params;
    if(!employee_id) return callback(`No employee id found !!`);
    Employees.remove({ employee_id: employee_id }, function (err, status) {
        if (err) return callback(err);
        callback(null, status);
    });
};

// Fetched all employee list from table
const getEmployeeList = (callback) => {
    Employees.find({}).exec((err, employeeList) => {
        if (err) return callback(err);
        callback(null, employeeList)
    });
};

module.exports = {
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
    fetchAllEmployees: getEmployeeList
} 