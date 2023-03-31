const db = require('../../config/db').MSSQLpool;
class EmploymentController {

    // Employee_ID (PK, FK, numeric(1 8,0), not null)
    // Employment_Status (nvarchar(50), null)
    // Hire_Date (datetime, null)
    // Workers_Comp_Code (nvarchar(50), null)
    // Termination_Date (datetime, null)
    // Rehire_Date (datetime, null)
    // Last_Review_Date (datetime, null)

    async getAllEmployment(req, res) {
        const sql = 'SELECT * FROM employment';
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
            Employment_Status,
            Hire_Date,
            Workers_Comp_Code,
            Termination_Date,
            Rehire_Date,
            Last_Review_Date
        } = req.body;

        const sql = "INSERT INTO employment ( Employee_ID, Employment_Status, Hire_Date, Workers_Comp_Code, Termination_Date, Rehire_Date, Last_Review_Date) VALUES (" +
        Employee_ID + ", '" + 
        Employment_Status + "', " +
        Hire_Date + ", '" +
        Workers_Comp_Code + "', " +
        Termination_Date + ", " +
        Rehire_Date + ", " +
        Last_Review_Date
        + ")";

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

module.exports = new EmploymentController;

