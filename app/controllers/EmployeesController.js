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
    //     async getEmployeeEarnings(req, res) {
    //         // Thực hiện truy vấn cơ sở dữ liệu để lấy thông tin cần thiết
    //         // Truy vấn MySQL
    //         const mssqlQuery = `SELECT p.Employee_ID, p.Gender, p.Ethnicity, j.Department, j.Salary_Type, j.Pay_Period, j.Hours_per_Week, e.Employment_Status
    //         FROM Personal p , Employment e , Job_History j
    //         WHERE p.Employee_ID = e.Employee_ID AND e.Employee_ID = j.Employee_ID`;

    //         mssqlDb.query(mssqlQuery, (mssqlErr, mssqlResult) => {
    //             if (mssqlErr) {
    //                 console.log('MySQL query error:', mssqlErr);
    //                 res.status(500).json({ error: 'Internal Server Error' });
    //                 return;
    //             }

    //             mssqlResult = mssqlResult.recordset || [];

    //             console.log('MsSQL query result:', mssqlResult);

    //             // Truy vấn MSSQL
    //             const mysqlQuery = `SELECT e.idEmployee, e.EmployeeNumber, e.PayRate, p.Value
    //     FROM employee e, payrates p
    //    WHERE e.PayRates_idPayRates = p.idPayRates`;

    //             mySqlDb.query(mysqlQuery, (mysqlErr, mysqlResult) => {
    //                 if (mssqlErr) {
    //                     console.log('MySQL query error:', mssqlErr);
    //                     res.status(500).json({ error: 'Internal Server Error' });
    //                     return;
    //                 }

    //                 console.log('MySQL query result:', mysqlResult);

    //                 const totalIncomeByDepartment = {};

    //                 // Lặp qua kết quả từ MsSQL
    //                 mssqlResult.forEach((item) => {
    //                     let employeeID = item.Employee_ID;
    //                     let gender = item.Gender;
    //                     let ethnicity = item.Ethnicity;
    //                     let department = item.Department;
    //                     let salaryType = item.Salary_Type;
    //                     let Employment_Status = item.Employment_Status;
    //                     let payPeriod = item.Pay_Period;
    //                     let hoursPerWeek = item.Hours_per_Week;

    //                     console.log({
    //                         employeeID,
    //                         gender,
    //                         ethnicity,
    //                         department,
    //                         salaryType,
    //                         payPeriod,
    //                         hoursPerWeek,
    //                         Employment_Status
    //                     })

    //                     switch (payPeriod){
    //                         case 'Hourly':
    //                             payPeriod = 1;
    //                             break;
    //                         case 'Weekly':
    //                             payPeriod = 52;
    //                             break;
    //                         case 'Bi-Weekly':
    //                             payPeriod = 26;
    //                             break;
    //                         case 'Monthly':
    //                             payPeriod = 12;
    //                             break;
    //                         default:
    //                             payPeriod = 1;
    //                     }
    //                     //   console.log(Employment_Status == 'Part-time');
    //                     // Kiểm tra điều kiện và tính toán thu nhập tương ứng
    //                     if (Employment_Status == 'Full-time') {
    //                         console.log('Full time')
    //                         // Tính toán thu nhập cho nhân viên làm việc toàn thời gian
    //                         // Lấy thông tin về mức lương từ MSSQL
    //                         const employeeInfo = mysqlResult.find((info) => info.idEmployee == employeeID);
    //                         if (employeeInfo) {
    //                             console.log('employeeInfo: ', employeeInfo)
    //                             const payRate = employeeInfo.PayRate;
    //                             const value = employeeInfo.Value;



    //                             // Tính toán tổng thu nhập
    //                             const totalIncome = payRate * value * hoursPerWeek * payPeriod;
    //                             console.log('totalIncome: ', totalIncome)
    //                             if (totalIncomeByDepartment[department]) {
    //                                 totalIncomeByDepartment[department] += totalIncome;
    //                             } else {
    //                                 totalIncomeByDepartment[department] = totalIncome;
    //                             }
    //                         }
    //                     } else if (Employment_Status == 'Part-time') {
    //                         console.log('Part-time')
    //                         // Tính toán thu nhập cho nhân viên làm việc bán thời gian
    //                         const employeeInfo = mysqlResult.find((info) => info.EmployeeNumber === employeeID);
    //                         if (employeeInfo) {
    //                             const payRate = employeeInfo.PayRate;
    //                             const value = employeeInfo.Value;

    //                             // Tính toán tổng thu nhập
    //                             const totalIncome = payRate * value * hoursPerWeek * payPeriod;
    //                             if (totalIncomeByDepartment[department]) {
    //                                 totalIncomeByDepartment[department] += totalIncome;
    //                             } else {
    //                                 totalIncomeByDepartment[department] = totalIncome;
    //                             }
    //                         }
    //                         // Tiếp tục xử lý tương tự như trên cho nhân viên làm việc bán thời gian
    //                     }
    //                 });

    //                 // Trả về kết quả tổng thu nhập theo từng phòng ban
    //                 res.json(totalIncomeByDepartment);
    //             });
    //         });
    //     }
    async getEmployeeEarnings(req, res) {
        let {
          department,
          shareholder,
          gender,
          ethnicity,
          employmentStatus,
          fromDate,
          toDate,
        } = req.body;
      
        console.log({
          department,
          shareholder,
          gender,
          ethnicity,
          employmentStatus,
          fromDate,
          toDate,
        });
      
        const mssqlQuery = `SELECT p.Employee_ID, p.Gender, p.Ethnicity, j.Department, j.Salary_Type, j.Pay_Period, j.Hours_per_Week, e.Employment_Status, p.Shareholder_Status
          FROM Personal p, Employment e, Job_History j
          WHERE p.Employee_ID = e.Employee_ID AND e.Employee_ID = j.Employee_ID`;
      
        mssqlDb.query(mssqlQuery, (mssqlErr, mssqlResult) => {
          if (mssqlErr) {
            console.log('MSSQL query error:', mssqlErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
      
          mssqlResult = mssqlResult.recordset || [];
      
          const mysqlQuery = `SELECT e.idEmployee, e.EmployeeNumber, e.PayRate, p.Value
            FROM Employee e, PayRates p
            WHERE e.PayRates_idPayRates = p.idPayRates`;
      
          mySqlDb.query(mysqlQuery, (mysqlErr, mysqlResult) => {
            if (mysqlErr) {
              console.log('MySQL query error:', mysqlErr);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }
      
            const totalIncomeByDepartment = {};
      
            mssqlResult.forEach((item) => {
              let {
                Employee_ID,
                Gender,
                Ethnicity,
                Department,
                Salary_Type,
                Employment_Status,
                Shareholder_Status,
                Pay_Period,
                Hours_per_Week,
              } = item;
      
              console.log(item);
      
              if (
                (!department || Department === department) &&
                (!shareholder || (shareholder === '1' && item.Shareholder_Status) || (shareholder === '0' && !item.Shareholder_Status)) &&
                (!gender || (gender === '1' && item.Gender) || (gender === '0' && !item.Gender)) &&
                (!ethnicity || Ethnicity === ethnicity) &&
                (!employmentStatus || Employment_Status === employmentStatus)
              ) {
                const fromDateObj = new Date(fromDate);
                const toDateObj = new Date(toDate);
      
                const fromDateYear = fromDateObj.getFullYear();
                const toDateYear = toDateObj.getFullYear();
      
                const jobStartDate = new Date(item.Start_Date);
                const jobEndDate = item.End_Date ? new Date(item.End_Date) : new Date();
      
                const jobStartYear = jobStartDate.getFullYear();
                const jobEndYear = jobEndDate.getFullYear();
      
                //jobStartYear <= toDateYear && jobEndYear >= fromDateYear
                if (true) {
                  switch (Pay_Period) {
                    case 'Hourly':
                      Pay_Period = 1;
                      break;
                    case 'Weekly':
                      Pay_Period = 52;
                      break;
                    case 'Bi-Weekly':
                      Pay_Period = 26;
                      break;
                    case 'Monthly':
                      Pay_Period = 12;
                      break;
                    default:
                      Pay_Period = 1;
                  }
                  const employmentHoursPerWeek = Hours_per_Week;
      
                  const employeeInfo = mysqlResult.find(
                    (info) => info.idEmployee == Employee_ID
                  );
      
                  if (employeeInfo) {
                    const payRate = employeeInfo.PayRate;
                    const value = employeeInfo.Value;
      
                    const totalIncome =
                      payRate * value * employmentHoursPerWeek * Pay_Period;
      
                    if (totalIncomeByDepartment[Department]) {
                      totalIncomeByDepartment[Department] += totalIncome;
                    } else {
                      totalIncomeByDepartment[Department] = totalIncome;
                    }
                  }
                }
              } else {
                console.log('No data');
              }
            });
      
            res.status(200).json({
                message: 'Success',
                data: totalIncomeByDepartment,
            });
          });
        });
      }
      

      async getTotalVacationDays(req, res) {
        const {
          shareholder,
          gender,
          ethnicity,
          employmentStatus,
          fromDate,
          toDate,
        } = req.body;
      
        console.log({
          shareholder,
          gender,
          ethnicity,
          employmentStatus,
          fromDate,
          toDate,
        });
      
        const mssqlQuery = `SELECT p.Employee_ID, p.Gender, p.Ethnicity, e.Employment_Status, p.Shareholder_Status
          FROM Personal p, Employment e, Job_History j
          WHERE p.Employee_ID = e.Employee_ID
          AND e.Employee_ID = j.Employee_ID
          ${toDate ? `AND j.Start_Date <= '${toDate}'` : ''}
          ${fromDate ? `AND (j.End_Date IS NULL OR j.End_Date >= '${fromDate}')` : ''}`;
      
        console.log(mssqlQuery);
      
        mssqlDb.query(mssqlQuery, (mssqlErr, mssqlResult) => {
          if (mssqlErr) {
            console.log('MSSQL query error:', mssqlErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
      
          mssqlResult = mssqlResult.recordset || [];
          console.log(mssqlResult);
      
          const mysqlQuery = `SELECT e.idEmployee, e.VacationDays
            FROM Employee e`;
      
          mySqlDb.query(mysqlQuery, (mysqlErr, mysqlResult) => {
            if (mysqlErr) {
              console.log('MySQL query error:', mysqlErr);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }
      
            const totalVacationDays = {
              shareholder: 0,
              gender: 0,
              ethnicity: 0,
              employmentStatus: 0,
            };
      
            mssqlResult.forEach((item) => {
              const {
                Employee_ID,
                Gender,
                Ethnicity,
                Employment_Status,
                Shareholder_Status,
              } = item;
      
              if (
                (!shareholder || (shareholder === '1' && Shareholder_Status) || (shareholder === '0' && !Shareholder_Status)) &&
                (!gender || (gender === '1' && Gender) || (gender === '0' && !Gender)) &&
                (!ethnicity || Ethnicity === ethnicity) &&
                (!employmentStatus || Employment_Status === employmentStatus)
              ) {
                const employeeInfo = mysqlResult.find(
                  (info) => info.idEmployee == Employee_ID
                );
      
                if (employeeInfo) {
                  totalVacationDays.shareholder += Shareholder_Status ? employeeInfo.VacationDays : 0;
                  totalVacationDays.gender += employeeInfo.VacationDays;
                  totalVacationDays.ethnicity += employeeInfo.VacationDays;
                  totalVacationDays.employmentStatus += employeeInfo.VacationDays;
                }
              }
            });
      
            res.json(totalVacationDays);
          });
        });
      }
      


}

module.exports = new EmployeesController;

