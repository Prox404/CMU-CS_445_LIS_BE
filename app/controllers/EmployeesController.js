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

    //total earnings by shareholder, gender, ethnicity, part-time, and full- time employee to date and the previous year, by department
    async getEmployeeEarnings(req, res) {
        // Thực hiện truy vấn cơ sở dữ liệu để lấy thông tin cần thiết
        // Truy vấn MySQL
        const mssqlQuery = `SELECT p.Employee_ID, p.Gender, p.Ethnicity, j.Department, j.Salary_Type, j.Pay_Period, j.Hours_per_Week
        FROM Personal p , Employment e , Job_History j
        WHERE p.Employee_ID = e.Employee_ID AND e.Employee_ID = j.Employee_ID`;

        mssqlDb.query(mssqlQuery, (mssqlErr, mssqlResult) => {
            if (mssqlErr) {
                console.log('MySQL query error:', mssqlErr);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            mssqlResult = mssqlResult.recordset || [];

            console.log('MsSQL query result:', mssqlResult);

            // Truy vấn MSSQL
            const mysqlQuery = `SELECT e.EmployeeNumber, e.PayRate, p.Value
    FROM employee e, payrates p
   WHERE e.PayRates_idPayRates = p.idPayRates`;

            mySqlDb.query(mysqlQuery, (mysqlErr, mysqlResult) => {
                if (mssqlErr) {
                    console.log('MySQL query error:', mssqlErr);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                
                console.log('MySQL query result:', mysqlResult);
                
                const totalIncomeByDepartment = {};

                // Lặp qua kết quả từ MsSQL
                mssqlResult.forEach((item) => {
                  const employeeID = item.Employee_ID;
                  const gender = item.Gender;
                  const ethnicity = item.Ethnicity;
                  const department = item.Department;
                  const salaryType = item.Salary_Type;
                  const payPeriod = item.Pay_Period;
                  const hoursPerWeek = item.Hours_per_Week;

                  console.log({
                    employeeID,
                    gender,
                    ethnicity,
                    department,
                    salaryType,
                    payPeriod,
                    hoursPerWeek
                  })
              
                  // Kiểm tra điều kiện và tính toán thu nhập tương ứng
                  if (salaryType === 'Full-time') {
                    // Tính toán thu nhập cho nhân viên làm việc toàn thời gian
                    // Lấy thông tin về mức lương từ MSSQL
                    const employeeInfo = mysqlResult.find((info) => info.EmployeeNumber === employeeID);
                    if (employeeInfo) {
                      const payRate = employeeInfo.PayRate;
                      const value = employeeInfo.Value;
              
                      // Tính toán tổng thu nhập
                      const totalIncome = payRate * value * hoursPerWeek * payPeriod;
                      if (totalIncomeByDepartment[department]) {
                        totalIncomeByDepartment[department] += totalIncome;
                      } else {
                        totalIncomeByDepartment[department] = totalIncome;
                      }
                    }
                  } else if (salaryType === 'Part-time') {
                    // Tính toán thu nhập cho nhân viên làm việc bán thời gian
                    const employeeInfo = mysqlResult.find((info) => info.EmployeeNumber === employeeID);
                    if (employeeInfo) {
                      const payRate = employeeInfo.PayRate;
                      const value = employeeInfo.Value;
                
                      // Tính toán tổng thu nhập
                      const totalIncome = payRate * value * hoursPerWeek * payPeriod;
                      if (totalIncomeByDepartment[department]) {
                        totalIncomeByDepartment[department] += totalIncome;
                      } else {
                        totalIncomeByDepartment[department] = totalIncome;
                      }
                    }
                    // Tiếp tục xử lý tương tự như trên cho nhân viên làm việc bán thời gian
                  }
                });
              
                // Trả về kết quả tổng thu nhập theo từng phòng ban
                res.json(totalIncomeByDepartment);
              });
        });
    }
}

module.exports = new EmployeesController;


