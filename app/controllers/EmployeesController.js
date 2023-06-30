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
            PaidLastYear,
            Birthday,
        } = req.body;

        let VacationDays = req.body.VacationDays || 0;

        const mySqlQuery = `INSERT INTO Employee (idEmployee, EmployeeNumber, LastName, FirstName, SSN, PayRate, PayRates_idPayRates, VacationDays, PaidToDate, PaidLastYear) VALUES (${Employee_ID}, ${EmployeeNumber}, '${Last_Name}', '${First_Name}', ${SSN}, '${PayRate}', ${PayRates_idPayRates}, ${VacationDays}, ${PaidToDate}, ${PaidLastYear})`;
        const mssqlQuery = `INSERT INTO personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity, Birthday) VALUES ('${Employee_ID}', '${First_Name}', '${Last_Name}', '${Middle_Initial}', '${Address1}', '${Address2}', '${City}', '${State}', '${Zip}', '${Email}', '${Phone_Number}', '${SSN}', '${Drivers_License}', '${Marital_Status}', ${Gender}, ${Shareholder_Status}, '${Benefit_Plans}', '${Ethnicity}', '${Birthday}')`;
        console.log(mySqlQuery);
        console.log(mssqlQuery);
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
                            const mergedResult = mySQLresult.map(mysqlObj => {
                                const mssqlObj = msSQLresult.recordsets[0].find(mssqlObj => mssqlObj.Employee_ID === mysqlObj.idEmployee);
                                return { ...mysqlObj, ...mssqlObj };
                            });
                            res.send({
                                status: 200,
                                data: mergedResult

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

    async getEmployeeEarnings(req, res) {
        try {
            // Lấy dữ liệu từ cơ sở dữ liệu MySQL (Payroll)
            const mysqlQuery = `
                SELECT payrates.Value, employee.PayRate, employee.idEmployee
                FROM payrates, employee
                WHERE payrates.idPayRates = employee.PayRates_idPayRates
            `;

            const mysqlData = await new Promise((resolve, reject) => {
                mySqlDb.query(mysqlQuery, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            console.log(mysqlData);

            // Lấy dữ liệu từ cơ sở dữ liệu MSSQL (HR)
            const mssqlQuery = `
            SELECT Job_History.Hours_per_Week, Job_History.Pay_Period, Job_History.Employee_ID,Job_History.Department,  Personal.Gender, Personal.Ethnicity, Employment.Employment_Status
            FROM Job_History ,Personal, Employment
            WHERE Job_History.Employee_ID = Personal.Employee_ID
            AND Job_History.Employee_ID = Employment.Employee_ID
            `;

            const mssqlData = await new Promise((resolve, reject) => {
                mssqlDb.query(mssqlQuery, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.recordset);
                    }
                });
            });

            console.log(mssqlData);

            // Khởi tạo đối tượng data để lưu tổng thu nhập cho từng yếu tố
            const data = {
                department: {},
                gender: {},
                ethnicity: {},
                employmentStatus: {},
            };

            // Lặp qua từng bản ghi và tính tổng thu nhập
            for (const mysqlRow of mysqlData) {
                const employeeId = mysqlRow.idEmployee;
                const matchingMssqlRow = mssqlData.find((mssqlRow) => mssqlRow.Employee_ID == employeeId);

                if (matchingMssqlRow) {
                    console.log('matchingMssqlRow: ', matchingMssqlRow);
                    const department = matchingMssqlRow.Department;
                    const gender = matchingMssqlRow.Gender;
                    const ethnicity = matchingMssqlRow.Ethnicity;
                    const employmentStatus = matchingMssqlRow.Employment_Status;
                    let payPeriod = matchingMssqlRow.Pay_Period;

                    if (!data.department[department]) {
                        data.department[department] = 0;
                    }
                    if (!data.gender[gender]) {
                        data.gender[gender] = 0;
                    }
                    if (!data.ethnicity[ethnicity]) {
                        data.ethnicity[ethnicity] = 0;
                    }
                    if (!data.employmentStatus[employmentStatus]) {
                        data.employmentStatus[employmentStatus] = 0;
                    }

                    switch (payPeriod) {
                        case 'Hourly':
                            payPeriod = 1;
                            break;
                        case 'Weekly':
                            payPeriod = 52;
                            break;
                        case 'Bi-Weekly':
                            payPeriod = 26;
                            break;
                        case 'Monthly':
                            payPeriod = 12;
                            break;
                        default:
                            payPeriod = 1;
                    }

                    // Tính tổng thu nhập
                    const earnings = mysqlRow.Value * mysqlRow.PayRate * matchingMssqlRow.Hours_per_Week * payPeriod;
                    data.department[department] += earnings;
                    data.gender[gender] += earnings;
                    data.ethnicity[ethnicity] += earnings;
                    data.employmentStatus[employmentStatus] += earnings;
                }
            }

            console.log('Data:', data);
            res.status(200).json({
                message: 'Success',
                data,
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                message: 'Error',
                error,
            });
        }
    }

    async getTotalVacationDays(req, res) {
        try {
            const mysqlQuery = `
              SELECT idEmployee, VacationDays
              FROM employee
            `;

            const mysqlData = await new Promise((resolve, reject) => {
                mySqlDb.query(mysqlQuery, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            const mssqlQuery = `
              SELECT j.Employee_ID, j.Department, p.Gender, p.Ethnicity, emp.Employment_Status
              FROM Job_History AS j
              INNER JOIN Personal AS p ON j.Employee_ID = p.Employee_ID
              INNER JOIN Employment AS emp ON j.Employee_ID = emp.Employee_ID
            `;

            const mssqlData = await new Promise((resolve, reject) => {
                mssqlDb.query(mssqlQuery, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.recordset);
                    }
                });
            });

            const leaveDays = {
                department: {},
                gender: {},
                ethnicity: {},
                employmentStatus: {},
            };

            for (const mysqlRow of mysqlData) {
                const employeeId = mysqlRow.idEmployee;
                const matchingMssqlRow = mssqlData.find((mssqlRow) => mssqlRow.Employee_ID === employeeId);

                if (matchingMssqlRow) {
                    const department = matchingMssqlRow.Department;
                    const gender = matchingMssqlRow.Gender;
                    const ethnicity = matchingMssqlRow.Ethnicity;
                    const employmentStatus = matchingMssqlRow.Employment_Status;
                    const vacationDays = mysqlRow.VacationDays;

                    if (!leaveDays.department[department]) {
                        leaveDays.department[department] = 0;
                    }
                    if (!leaveDays.gender[gender]) {
                        leaveDays.gender[gender] = 0;
                    }
                    if (!leaveDays.ethnicity[ethnicity]) {
                        leaveDays.ethnicity[ethnicity] = 0;
                    }
                    if (!leaveDays.employmentStatus[employmentStatus]) {
                        leaveDays.employmentStatus[employmentStatus] = 0;
                    }

                    leaveDays.department[department] += vacationDays;
                    leaveDays.gender[gender] += vacationDays;
                    leaveDays.ethnicity[ethnicity] += vacationDays;
                    leaveDays.employmentStatus[employmentStatus] += vacationDays;
                }
            }

            console.log('Leave Days:', leaveDays);
            res.status(200).json({
                message: 'Success',
                data: leaveDays,
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                message: 'Error',
                error,
            });
        }
    }

    async calculateAverageBenefitsPaid(req, res) {
        try {
            // Get shareholders and non-shareholders from the Personal table in the HR database
            const shareholdersQuery = 'SELECT Employee_ID FROM Personal WHERE Shareholder_Status = 1';
            const nonShareholdersQuery = 'SELECT Employee_ID FROM Personal WHERE Shareholder_Status = 0';

            const [shareholdersResult, nonShareholdersResult] = await Promise.all([
                mssqlDb.query(shareholdersQuery),
                mssqlDb.query(nonShareholdersQuery)
            ]);
            const shareholders = shareholdersResult.recordset.map((row) => row.Employee_ID);
            const nonShareholders = nonShareholdersResult.recordset.map((row) => row.Employee_ID);

            let shareholderAverageBenefits = {};
            // console.log("shareholders:", shareholders);
            if (shareholders.length > 0) {

                // Calculate the average benefits paid to shareholders by benefits plan
                const shareholderBenefitsQuery = `
            SELECT Plan_Name, AVG(Deductable) AS Average_Benefits
            FROM Benefit_Plans
            WHERE Benefit_Plan_ID IN (
              SELECT Benefit_Plans
              FROM Personal
              WHERE Employee_ID IN (${shareholders.join(',')})
            )
            GROUP BY Plan_Name
          `;
                //   console.log(shareholderBenefitsQuery);
                const shareholderBenefitsResult = await mssqlDb.query(shareholderBenefitsQuery);
                console.log(shareholderBenefitsResult);
                shareholderAverageBenefits = shareholderBenefitsResult.recordset.reduce(
                    (averageBenefits, row) => {
                        averageBenefits[row.Plan_Name] = row.Average_Benefits;
                        return averageBenefits;
                    },
                    {}
                );
            }

            let nonShareholderAverageBenefits = {};

            if (nonShareholders.length > 0) {
                console.log("nonShareholders:", nonShareholders);
                const nonShareholderBenefitsQuery = `
                    SELECT Plan_Name, AVG(Deductable) AS Average_Benefits
                    FROM Benefit_Plans
                    WHERE Benefit_Plan_ID IN (
                    SELECT Benefit_Plans
                    FROM Personal
                    WHERE Employee_ID IN (${nonShareholders.join(',')})
            )
            GROUP BY Plan_Name
          `;
                console.log(nonShareholderBenefitsQuery);
                const nonShareholderBenefitsResult = await mssqlDb.query(nonShareholderBenefitsQuery);
                nonShareholderAverageBenefits = nonShareholderBenefitsResult.recordset.reduce(
                    (averageBenefits, row) => {
                        averageBenefits[row.Plan_Name] = row.Average_Benefits;
                        return averageBenefits;
                    },
                    {}
                );
            }

            // Calculate the average benefits paid to non-shareholders by benefits plan


            // Combine the results for shareholders and non-shareholders
            const averageBenefitsPaid = {
                shareholders: shareholderAverageBenefits,
                nonShareholders: nonShareholderAverageBenefits
            };

            res.status(200).json({
                message: 'Success',
                data: averageBenefitsPaid,
            });
        } catch (error) {
            // throw error;
            console.error('Error:', error);
            res.status(500).json({
                message: 'Error',
                error,
            });
        }
    }

    // async checkHiringAnniversary(req, res) {
    //     const { daysThreshold } = req.body;
    //     console.log(daysThreshold);
    //     try {
    //         // Retrieve employee's hiring date from MySQL database
    //         const mssqlQuery0 = `SELECT * FROM Employment`;
    //         const mssqlResult0 = await mssqlDb.query(mssqlQuery0);
    //         const hireDate = mssqlResult0.recordset[0].Hire_Date;
    //         console.log(hireDate);

    //         // Retrieve current date from MSSQL database
    //         const mssqlQuery = `SELECT GETDATE() AS CurrentDate`;
    //         const mssqlResult = await mssqlDb.query(mssqlQuery);
    //         const currentDate = mssqlResult.recordset[0].CurrentDate;

    //         // Calculate the number of days between the current date and the employee's hiring anniversary
    //         const hiringAnniversary = new Date(currentDate.getFullYear(), hireDate.getMonth(), hireDate.getDate());
    //         const millisecondsPerDay = 24 * 60 * 60 * 1000;
    //         const daysDifference = Math.round((hiringAnniversary - currentDate) / millisecondsPerDay);

    //         // Check if the employee is within the specified number of days of their hiring anniversary
    //         const isWithinThreshold = Math.abs(daysDifference) <= daysThreshold;

    //         res.status(200).json({
    //             message: 'Success',
    //             data: isWithinThreshold,
    //         });
    //     } catch (error) {
    //         console.error('Error checking hiring anniversary:', error);
    //         // throw error;
    //         res.status(500).json({
    //             message: 'Error',
    //             error,
    //         });
    //     }
    // }

    async checkHiringAnniversary(req, res) {
        const { daysThreshold } = req.query;

        try {
            // Retrieve current date from MSSQL database
            const mssqlQuery = `SELECT GETDATE() AS CurrentDate`;
            const mssqlResult = await mssqlDb.query(mssqlQuery);
            const currentDate = mssqlResult.recordset[0].CurrentDate;

            let employees = [];

            if (daysThreshold) {
                // Calculate the hiring anniversary threshold date based on the current date and daysThreshold
                const hiringAnniversaryThreshold = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysThreshold);

                // Retrieve employees who are within the specified number of days of their hiring anniversary
                const mssqlQuery2 = `SELECT Employment.Employee_ID, Employment_Status, Hire_Date, First_Name, Last_Name, Gender, Shareholder_Status FROM Employment, Personal WHERE Employment.Employee_ID = Personal.Employee_ID`;
                const mssqlResult2 = await mssqlDb.query(mssqlQuery2);
                employees = mssqlResult2.recordset.filter((employee) => {
                    const hireDate = employee.Hire_Date;
                    const hiringAnniversary = new Date(currentDate.getFullYear(), hireDate.getMonth(), hireDate.getDate());
                    const daysDifference = Math.round((hiringAnniversary - currentDate) / (24 * 60 * 60 * 1000));
                    return Math.abs(daysDifference) <= daysThreshold;
                });
            } else {
                // Retrieve all employees
                const mssqlQuery2 = `SELECT Employment.Employee_ID, Employment_Status, Hire_Date, First_Name, Last_Name, Gender, Shareholder_Status FROM Employment, Personal WHERE Employment.Employee_ID = Personal.Employee_ID`;
                const mssqlResult2 = await mssqlDb.query(mssqlQuery2);
                employees = mssqlResult2.recordset;
            }

            res.status(200).json({
                message: 'Success',
                data: employees,
            });
        } catch (error) {
            console.error('Error checking hiring anniversary:', error);
            res.status(500).json({
                message: 'Error',
                error,
            });
        }
    }

    async checkVacationDays(req, res) {
        const { daysThreshold } = req.query;
        let mysqlQuery = `SELECT * FROM employee`;

        if (daysThreshold) {
            mysqlQuery += ` WHERE VacationDays >= ${daysThreshold}`;
        }

        try {
            // Retrieve employees from the MySQL database
            const mysqlResult = await new Promise((resolve, reject) => {
                mySqlDb.query(mysqlQuery, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            const employees = mysqlResult;
            console.log(employees);

            res.status(200).json({
                message: 'Success',
                data: employees,
            });
        } catch (error) {
            console.error('Error checking vacation days:', error);
            res.status(500).json({
                message: 'Error',
                error,
            });
        }
    }


    async getEmployeesWithBirthdays(req, res) {
        const { month } = req.query;
        try {
            // Retrieve employees with birthdays within the specified month from the MSSQL database
            let mssqlQuery = 'SELECT * FROM Personal';

            if (month) {
                mssqlQuery += ` WHERE MONTH(Birthday) = ${month}`;
            }

            const mssqlResult = await new Promise((resolve, reject) => {
                mssqlDb.query(mssqlQuery, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.recordset);
                    }
                });
            });

            // Combine the employees from both databases
            res.status(200).json({
                message: 'Success',
                data: mssqlResult,
            });
        } catch (error) {
            console.error('Error retrieving employees with birthdays:', error);
            res.status(500).json({
                message: 'Error',
                error,
            });
        }
    }

}

module.exports = new EmployeesController;

