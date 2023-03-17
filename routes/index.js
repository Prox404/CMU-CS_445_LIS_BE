const employeeRoutes = require('./employee');

function route(app) {
    app.get('/', (req, res) => {
        res.send('PayRoll API!');
    });
    app.use('/employee', employeeRoutes);

}

module.exports = route