const db = require('../../config/db').MSSQLpool;
class BenefitPlansController {

    // Benefit_Plan_ID (pk, numberic(18,0), not null)
    // Plan_Name (nvarchar(50), null)
    // Deductable   (numberic(18,0), null)
    // Percentage_CoPay (int, null)

    async getAllBenefitPlans(req, res) {
        const sql = 'SELECT * FROM Benefit_Plans';
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

    async store(req, res){
        const {  Plan_Name, Deductable , Percentage_CoPay} = req.body;

        const sql = `INSERT INTO Benefit_Plans ( Plan_Name, Deductable , Percentage_CoPay ) VALUES ( '${Plan_Name}', ${Deductable}, ${Percentage_CoPay})`;
    
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
        }catch{
            console.log(err);
        }

    }
}

module.exports = new BenefitPlansController;