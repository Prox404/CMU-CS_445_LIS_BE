const db = require('../../config/db').mysqlPool;
class EmployeeController {
    async store(req, res) {
        // idEmployee int primary key
        // EmployeeNumber int
        // LastName varchar(45)
        // FirstName varchar(45)
        // SSN decimal(10,0)
        // PayRate varchar(40)
        // PayRates_idPayRates int primary key
        // VacationDays int
        // PaidToDate   decimal(2,0)
        // PaidLastYear decimal(2,0)

        const {idEmployee, EmployeeNumber, LastName, FirstName, SSN, PayRate,PayRates_idPayRates, VacationDays, PaidToDate, PaidLastYear } = req.body;

        const sql = `INSERT INTO Employee (idEmployee, EmployeeNumber, LastName, FirstName, SSN, PayRate, PayRates_idPayRates, VacationDays, PaidToDate, PaidLastYear) VALUES (${idEmployee}, ${EmployeeNumber}, '${LastName}', '${FirstName}', ${SSN}, '${PayRate}', ${PayRates_idPayRates}, ${VacationDays}, ${PaidToDate}, ${PaidLastYear})`;

        try {
            db.query(sql, (err, result) => {
                if (err) {
                    res.send({
                        status: 500,
                        data: err
                    });
                } else {
                    res.send({
                        status: 200,
                        data: result
                    });
                };
            });
        }
        catch(err) {
            console.log(err);
        }

    }

    async getAllUser(req, res) {
        const sql = 'SELECT * FROM Employee';
        try {
            db.query(sql, (err, result) => {
                if (err) {
                    res.send({
                        status: 500,
                        data: err
                    });
                } else {
                    res.send({
                        status: 200,
                        data: result
                    });
                };
            }
            );
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new EmployeeController;