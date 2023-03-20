const employeeRoutes = require('./employee');
const payRatesRoutes = require('./payrates');
const personalRoutes = require('./personal');

function route(app) {
    app.get('/', (req, res) => {
        res.send('PayRoll API!');
    });
    app.use('/employee', employeeRoutes);

    app.use('/payrates', payRatesRoutes);

    app.use('/personal', personalRoutes);
}

module.exports = route