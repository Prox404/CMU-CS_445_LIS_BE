const employeeRoutes = require('./employee');

function route(app) {
    app.use('/employee', employeeRoutes);
}

module.exports = route