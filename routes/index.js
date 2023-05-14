const employeeRoutes = require('./employee');
const payRatesRoutes = require('./payrates');
const personalRoutes = require('./personal');
const benefitPlansRoutes = require('./benefitPlans');
const jobHistoryRoutes = require('./jobHistory');
const employmentRoutes = require('./employment');
const emergencyContactRoutes = require('./emergencyContact');
const employeesRoutes = require('./employees');

function route(app) {
    app.get('/', (req, res) => {
        res.send('PayRoll API!');
    });
    app.use('/employee', employeeRoutes);
    
    app.use('/employees', employeesRoutes);

    app.use('/payrates', payRatesRoutes);

    app.use('/personal', personalRoutes);

    app.use('/benefitPlans', benefitPlansRoutes);

    app.use('/jobHistory', jobHistoryRoutes);

    app.use('/employment', employmentRoutes);

    app.use('/emergencyContact', emergencyContactRoutes);
}

module.exports = route