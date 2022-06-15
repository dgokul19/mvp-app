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
    Employees.findOneAndUpdate({ employee_id: employee_id }, options, { upsert: true }, function (err, doc) {
        if (err) return callback(err);
        callback(null, doc);
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
    fetchAllEmployees: getEmployeeList
} 