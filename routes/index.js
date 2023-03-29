const employeeRoutes = require('./employee');
const payRatesRoutes = require('./payrates');
const personalRoutes = require('./personal');
const benefitPlansRoutes = require('./benefitPlans');
const jobHistoryRoutes = require('./jobHistory')

function route(app) {
    app.get('/', (req, res) => {
        res.send('PayRoll API!');
    });
    app.use('/employee', employeeRoutes);

    app.use('/payrates', payRatesRoutes);

    app.use('/personal', personalRoutes);

    app.use('/benefitPlans', benefitPlansRoutes);

    app.use('/jobHistory', jobHistoryRoutes);
}

module.exports = route