const mySqlDb = require('../../config/db').mysqlPool;
const mssqlDb = require('../../config/db').MSSQLpool;

class EmployeesController {
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

        const {
            Employee_ID,
            First_Name,
            Last_Name,
            Middle_Initial,
            Address1,
            Address2,
            City,
            State,
            Zip,
            Email,
            Phone_Number,
            Drivers_License,
            Marital_Status,
            Gender,
            Shareholder_Status,
            Benefit_Plans,
            Ethnicity,
            EmployeeNumber,
            SSN,
            PayRate,
            PayRates_idPayRates,
            PaidToDate,
            PaidLastYear
        } = req.body;

        let VacationDays = req.body.VacationDays || 0;

        const mySqlQuery = `INSERT INTO Employee (idEmployee, EmployeeNumber, LastName, FirstName, SSN, PayRate, PayRates_idPayRates, VacationDays, PaidToDate, PaidLastYear) VALUES (${Employee_ID}, ${EmployeeNumber}, '${Last_Name}', '${First_Name}', ${SSN}, '${PayRate}', ${PayRates_idPayRates}, ${VacationDays}, ${PaidToDate}, ${PaidLastYear})`;
        const mssqlQuery = `INSERT INTO personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) VALUES ('${Employee_ID}', '${First_Name}', '${Last_Name}', '${Middle_Initial}', '${Address1}', '${Address2}', '${City}', '${State}', '${Zip}', '${Email}', '${Phone_Number}', '${SSN}', '${Drivers_License}', '${Marital_Status}', ${Gender}, ${Shareholder_Status}, '${Benefit_Plans}', '${Ethnicity}')`;

        try {
            mySqlDb.query(mySqlQuery, (err, mySQLresult) => {
                if (err) {
                    res.send({
                        status: 500,
                        data: err
                    });
                } else {
                    mssqlDb.query(mssqlQuery, (err, msSQLresult) => {
                        if (err) {
                            res.send({
                                status: 500,
                                data: err
                            });
                        } else {
                            res.send({
                                status: 200,
                                data: {
                                    mySQLresult,
                                    msSQLresult
                                }
                            });
                        };
                    });
                };
            });

        }
        catch (err) {
            console.log(err);
        }

    }

    async getAllUser(req, res) {
        const mysqlQuery = 'SELECT * FROM Employee';
        const mssqlQuery = 'SELECT * FROM personal';
        try {
            mySqlDb.query(mysqlQuery, (err, mySQLresult) => {
                if (err) {
                    res.send({
                        status: 500,
                        data: err
                    });
                } else {
                    mssqlDb.query(mssqlQuery, (err, msSQLresult) => {
                        if (err) {
                            res.send({
                                status: 500,
                                data: err
                            });
                        } else {
                            res.send({
                                status: 200,
                                data: {
                                    mySQLresult,
                                    msSQLresult
                                }
                            });
                        };
                    });
                };
            }
            );
        }
        catch (err) {
            console.log(err);
        }
    }

    //total earnings by shareholder, gender, ethnicity, part-time, and full- time employee to date and the previous year, by department
    async getEmployeeEarnings(req, res) {
        
    }
}

module.exports = new EmployeesController;


