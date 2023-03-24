const db = require('../../config/db').MSSQLpool;
class PersonalController {

    //Employee_ID (PK, numberic(18,0), not null)
    //First_Name (nvarchar(50), null)
    //Last_Name (nvarchar(50), null)
    // Middle_Initial (nvarchar(50), null)
    // Address1 (nvarchar(50), null)
    // Address2 (nvarchar(50), null)
    // City (nvarchar(50), null)
    // State (nvarchar(50), null)
    // Zip (numberic(18,0), null)
    // Email (nvarchar(50), null)
    // Phone_Number (nvarchar(50), null)
    // Social_Security_Number (nvarchar(50), null)
    // Drivers_License (nvarchar(50), null)
    // Marital_Status (nvarchar(50), null)
    // Gender (bit, null)
    // Shareholder_Status (bit, not null)
    // Benefit_Plans (FK, numeric(18,0), null)
    // Ethnicity (nvarchar(50), null)

    async getAllPersonal(req, res) {
        const sql = 'SELECT * FROM personal';
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

module.exports = new PersonalController;