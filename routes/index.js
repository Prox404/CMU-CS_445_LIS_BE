const employeeRoutes = require('./employee');
const payRatesRoutes = require('./payrates');

function route(app) {
    app.get('/', (req, res) => {
        res.send('PayRoll API!');
    });
    app.use('/employee', employeeRoutes);

    app.use('/payrates', payRatesRoutes);

}

module.exports = route