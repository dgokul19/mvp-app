const Employees = require('../model/employee');

const createEmployeeList = () => {

};
                                                // Fetched all employee list from table
const getEmployeeList = (callback) => {
    Employees.find({}).exec((err, employeeList) => {
        if (err) return callback(err);
        callback(null, employeeList)
    });
};

module.exports = {
    createEmployeeList: createEmployeeList,
    fetchAllEmployees: getEmployeeList
} 