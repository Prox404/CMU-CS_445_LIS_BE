const mysql = require('mysql');

const Employee = (sequelize, DataTypes) => {
    //idEmployee	EmployeeNumber	LastName	FirstName	SSN	PayRate	PayRates_idPayRates	VacationDays	PaidToDate	PaidLastYear
    const Employee = sequelize.define('Employee', {
        idEmployee: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        EmployeeNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SSN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PayRate: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        PayRates_idPayRates: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        VacationDays: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        PaidToDate: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        PaidLastYear: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'Employee',
        timestamps: false
    });

};

module.exports = Employee;