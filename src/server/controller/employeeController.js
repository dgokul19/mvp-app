const csv = require('csvtojson')
const path = require('path');
const Employees = require('../model/employee');

const filePath = path.join(__dirname, '../../../src/assets/sample.csv');

const updateEmployee = (req, callback) => {
    const { employee_id } = req.params;
    console.log({ employee_id });
    if (!employee_id) return callback(`No employee id found !!`)
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
    if (!employee_id) return callback(`No employee id found !!`);
    Employees.remove({ employee_id: employee_id }, function (err, status) {
        if (err) return callback(err);
        callback(null, status);
    });
};

// Fetched all employee list from table
const getEmployeeList = (callback) => {
    Employees.find({}).exec((err, employeeList) => {
        if (err) return callback(err);
        console.log({ employeeList });

        callback(null, employeeList)
    });
};

const validateCsvFiles = async (csvSource, fileDetails) => {
    let response = {
        file_name: fileDetails.originalname
    };
    let count = 0;
    let data = csvSource.filter(record => {
        if (record[0].charAt(0) === '#' || record.length > 4) {
            count++;
        } else {
            return true;
        }
    });

    if (count > 2) {
        response.error = `Invalid file, Please upload the valid file`;
        return response;
    }

    const bulkOps = data.map(record => {
        const params = {
            employee_id: record[0],
            login_id: record[1],
            full_name: record[2],
            salary: record[3]
        }
        return {
            updateOne: {
                filter: { employee_id: record[0] },
                update: params,
                upsert: true,
            }
        }
    });
    await Employees.bulkWrite(bulkOps)
        .then(bulkWriteOpResult => {
            console.log('Bul Update Success', bulkWriteOpResult);
            response.message = `CSV updated Successfully`;
        }).catch(error => {
            console.log('Bull Update Failed', error);
            response.error = `Error in uploading ${fileDetails.originalname}: => error is ${error}`;
        });
    return response;
};

const processCsvFiles = async (file) => {
    const filePath = path.join(__dirname, `../../../${file.path}`);

    return await csv({ noheader: true, trim: true, output: "csv" })
        .fromFile(filePath)
        .then(csvObject => {
            console.log('csvObject', csvObject);
            return validateCsvFiles(csvObject, file)
        });
};

const createEmployeeList = async (files, callback) => {
    const calls = await Promise.allSettled(files.map(file => processCsvFiles(file)))
    callback(null, calls.map(status => status.value));
};

module.exports = {
    createEmployeeList: createEmployeeList,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee,
    fetchAllEmployees: getEmployeeList
} 