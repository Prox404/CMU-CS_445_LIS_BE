class EmployeeController {
    async store(req, res) {
        // idEmployee int primary key
        // EmployeeNumber int
        // LastName varchar(45)
        // FirstName varchar(45)
        // SSN decimal(10,0)
        // PayRate varchar(40)
        // PayRates_idPayRates int primary key
        // VacationDays int
        // PaidToDate   decimal(2,0)
        // PaidLastYear decimal(2,0)

        const { EmployeeNumber, LastName, FirstName, SSN, PayRate, VacationDays, PaidToDate, PaidLastYear } = req.body;
        
    }
}

module.exports = new EmployeeController;