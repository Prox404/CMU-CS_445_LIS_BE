const db = require('../../config/db').MSSQLpool;
class JobHistoryController {

    // ID (PK,numberic(18,0), not null)
    // Employee_ID (FK,numberic(18,0), not null)
    // Department (nvarchar(50), null)
    // Division (nvarchar(50), null)
    // Start_Date (datetime, null)
    // End_Date (datetime, null)
    // Job_Title (nvarchar(50), null)
    // Supervisor (numberic(18,0), null)
    // Job_Category (nvarchar(50), null)
    // Location (nvarchar(50), null)
    // Departmen_Code (numberic(18,0), null)
    // Salary_Type (numeric(18,O), null)
    // Pay_Period (nvarchar(50), null)
    // Hours_per_Week (numeric(18,O), null)
    // Hazardous_Training (bit, null)

    async getAllJobHistory(req, res) {
        const sql = 'SELECT * FROM Job_History';
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

    async store(req, res) {
    
        const {
            Employee_ID,
            Department,
            Division,
            Start_Date,
            End_Date,
            Job_Title,
            Supervisor,
            Job_Category,
            Location,
            Departmen_Code,
            Salary_Type,
            Pay_Period,
            Hours_per_Week,
            Hazardous_Training
        } = req.body;

        const sql = "INSERT INTO Job_History ( Employee_ID, Department, Division, Start_Date, End_Date, Job_Title, Supervisor, Job_Category, Location, Departmen_Code, Salary_Type, Pay_Period, Hours_per_Week, Hazardous_Training) VALUES (" +
        Employee_ID + ", " +
        "'" + Department + "', " +
        "'" + Division + "', " +
        "'" +  Start_Date + "', " +
        "'" +  End_Date + "', " +
        "'" + Job_Title + "', " +
        Supervisor + ", " +
        "'" + Job_Category + "', " +
        "'" + Location + "', " +
        Departmen_Code + ", " +
        Salary_Type + ", " +
        "'" + Pay_Period + "', " +
        Hours_per_Week + ", " +
        Hazardous_Training + ")";

        console.log(sql);
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
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new JobHistoryController;