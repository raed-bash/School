-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 25 يناير 2023 الساعة 02:16
-- إصدار الخادم: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school`
--

-- --------------------------------------------------------

--
-- بنية الجدول `informationarticle`
--

CREATE TABLE `informationarticle` (
  `id` int(6) UNSIGNED NOT NULL,
  `NameArticle` varchar(30) NOT NULL,
  `NameTeacher` varchar(30) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `informationarticle`
--

INSERT INTO `informationarticle` (`id`, `NameArticle`, `NameTeacher`, `reg_date`) VALUES
(1, 'رياضيات', 'رياض الاحمد', '2023-01-25 00:23:20');

-- --------------------------------------------------------

--
-- بنية الجدول `informationgrade`
--

CREATE TABLE `informationgrade` (
  `id` int(6) UNSIGNED NOT NULL,
  `Name` varchar(30) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `informationgrade`
--

INSERT INTO `informationgrade` (`id`, `Name`, `reg_date`) VALUES
(1, 'الأول', '2023-01-25 00:30:03');

-- --------------------------------------------------------

--
-- بنية الجدول `informationmarks`
--

CREATE TABLE `informationmarks` (
  `id` int(6) UNSIGNED NOT NULL,
  `Marks` int(6) NOT NULL,
  `NameStudents` varchar(30) NOT NULL,
  `NameArticle` varchar(30) NOT NULL,
  `result` varchar(20) NOT NULL,
  `reg-date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `informationmarks`
--

INSERT INTO `informationmarks` (`id`, `Marks`, `NameStudents`, `NameArticle`, `result`, `reg-date`) VALUES
(1, 9, 'raed', 'رياضيات', 'راسب', '2023-01-25 01:04:46'),
(2, 66, 'raed', 'رياضيات', 'ناجح', '2023-01-25 01:04:56');

-- --------------------------------------------------------

--
-- بنية الجدول `informationstudents`
--

CREATE TABLE `informationstudents` (
  `id` int(6) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `year` int(6) NOT NULL,
  `month` varchar(30) NOT NULL,
  `day` int(2) NOT NULL,
  `image` varchar(30) NOT NULL,
  `address` varchar(30) DEFAULT NULL,
  `Grade` varchar(30) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `informationstudents`
--

INSERT INTO `informationstudents` (`id`, `name`, `year`, `month`, `day`, `image`, `address`, `Grade`, `reg_date`) VALUES
(1, 'raed', 2005, 'April', 4, 'uploads/raed.png', '', 'الأول', '2023-01-25 01:12:08');

-- --------------------------------------------------------

--
-- بنية الجدول `informationteacher`
--

CREATE TABLE `informationteacher` (
  `id` int(6) UNSIGNED NOT NULL,
  `NameT` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `month` varchar(30) NOT NULL,
  `day` int(2) NOT NULL,
  `AddressT` varchar(30) DEFAULT NULL,
  `reg_date` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- إرجاع أو استيراد بيانات الجدول `informationteacher`
--

INSERT INTO `informationteacher` (`id`, `NameT`, `year`, `month`, `day`, `AddressT`, `reg_date`) VALUES
(1, 'رياض الأحمد', 1970, 'March', 2, '', '2023-01-25 01:10:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `informationarticle`
--
ALTER TABLE `informationarticle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `informationgrade`
--
ALTER TABLE `informationgrade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `informationmarks`
--
ALTER TABLE `informationmarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `informationstudents`
--
ALTER TABLE `informationstudents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `informationteacher`
--
ALTER TABLE `informationteacher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `informationarticle`
--
ALTER TABLE `informationarticle`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `informationgrade`
--
ALTER TABLE `informationgrade`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `informationmarks`
--
ALTER TABLE `informationmarks`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `informationstudents`
--
ALTER TABLE `informationstudents`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `informationteacher`
--
ALTER TABLE `informationteacher`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
