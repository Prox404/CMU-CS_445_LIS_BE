const db = require('../../config/db').MSSQLpool;
class EmergencyContactsController {

    // Employee_ID (PK, FK, numeric(1 8,0), not null)
    // Emergency_Contact_Name (nvarchar(50), null)
    // Phone_Number (nvarchar(50), null)
    // Relationship (nvarchar(50), null)

    async getAllEmploymentContact(req, res) {
        const sql = 'SELECT * FROM Emergency_Contacts';
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
            Emergency_Contact_Name,
            Phone_Number,
            Relationship
        } = req.body;

        const sql = "INSERT INTO Emergency_Contacts ( Employee_ID, Emergency_Contact_Name, Phone_Number, Relationship) VALUES (" +
        Employee_ID + ", '" +
        Emergency_Contact_Name + "', '" +
        Phone_Number + "', '" +
        Relationship + "')";

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

module.exports = new EmergencyContactsController;

