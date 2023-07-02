-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 02, 2023 at 09:43 AM
-- Server version: 5.7.33
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `si_payroll_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `idEmployee` int(11) NOT NULL,
  `EmployeeNumber` int(10) UNSIGNED NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `SSN` decimal(10,0) NOT NULL,
  `PayRate` varchar(40) DEFAULT NULL,
  `PayRates_idPayRates` int(11) NOT NULL,
  `VacationDays` int(11) DEFAULT NULL,
  `PaidToDate` decimal(2,0) DEFAULT NULL,
  `PaidLastYear` decimal(2,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`idEmployee`, `EmployeeNumber`, `LastName`, `FirstName`, `SSN`, `PayRate`, `PayRates_idPayRates`, `VacationDays`, `PaidToDate`, `PaidLastYear`) VALUES
(2, 2, 'Doe', 'John', '1', '0.5', 1, 3, '1', '1'),
(3, 3, 'Doe', 'John', '1', '0.5', 1, 3, '1', '1'),
(4, 4, 'Doe', 'John', '1', '0.5', 1, 3, '1', '1'),
(5, 5, 'Doe', 'John', '1', '0.5', 1, 3, '1', '1'),
(6, 6, '1', '1', '1', '1', 1, 1, '1', '1'),
(7, 7, '1', '1', '1', '1', 1, 1, '1', '1'),
(9, 9, 'Doe', 'John', '1', '0.5', 1, 3, '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `payrates`
--

CREATE TABLE `payrates` (
  `idPayRates` int(11) NOT NULL,
  `PayRateName` varchar(40) NOT NULL,
  `Value` decimal(10,0) NOT NULL,
  `TaxPercentage` decimal(10,0) NOT NULL,
  `PayType` int(11) NOT NULL,
  `PayAmount` decimal(10,0) NOT NULL,
  `PT_LevelC` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payrates`
--

INSERT INTO `payrates` (`idPayRates`, `PayRateName`, `Value`, `TaxPercentage`, `PayType`, `PayAmount`, `PT_LevelC`) VALUES
(1, 'abc', '1', '1', 1, '1', '1'),
(2, 'abc', '1', '1', 1, '1', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`EmployeeNumber`,`PayRates_idPayRates`),
  ADD UNIQUE KEY `EmployeeNumber_UNIQUE` (`EmployeeNumber`),
  ADD KEY `fk_Employee_PayRates` (`PayRates_idPayRates`);

--
-- Indexes for table `payrates`
--
ALTER TABLE `payrates`
  ADD PRIMARY KEY (`idPayRates`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `fk_Employee_PayRates` FOREIGN KEY (`PayRates_idPayRates`) REFERENCES `payrates` (`idPayRates`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
