const db = require('../../config/db').mysqlPool;
class PayRatesController {
    async store(req, res) {
        // idPayRates int primary key
        // PayRateName varchar(40)
        // Value decimal(10,0)
        // TaxPercentage decimal(10,0)
        // PayType int(11)
        // PayAmount decimal(10,0)
        // PT-LevelC decimal(10,0)

        const {idPayRates, PayRateName, Value, TaxPercentage, PayType, PayAmount, PT_LevelC } = req.body;

        const sql = `INSERT INTO PayRates (idPayRates, PayRateName, Value, TaxPercentage, PayType, PayAmount, PT_LevelC) VALUES ( ${idPayRates},'${PayRateName}', ${Value}, ${TaxPercentage}, ${PayType}, ${PayAmount}, ${PT_LevelC})`;
        
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

    async getAllPayRates(req, res) {
        const sql = 'SELECT * FROM payrates';
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

module.exports = new PayRatesController;