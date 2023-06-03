-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-05-2023 a las 01:09:37
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `luister`
--

-- --------------------------------------------------------

DROP DATABASE IF EXISTS luister;

CREATE  DATABASE luister;

USE luister;

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(25) NOT NULL,
  `email` varchar(55) NOT NULL,
  `password` longtext NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Estructura de usersettings
--
CREATE TABLE `usersettings` (
`key` VARCHAR(25) NOT NULL,
`value` BOOLEAN NOT NULL,
`userid` INT NOT NULL,
CONSTRAINT FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

--
-- Estructura de tabla para la tabla `customlists`
--

CREATE TABLE `customlists` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(55) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  CONSTRAINT fk_customlists_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE  CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customlisttracks`
--

CREATE TABLE `customlisttracks` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(55) NOT NULL,
  `artist` varchar(25) NOT NULL,
  `customlistid` int(11) NOT NULL,
  `lookupkey` varchar(100) NOT NULL,
  `includedon` datetime NOT NULL DEFAULT current_timestamp(),
  CONSTRAINT fk_cltracks_customlistid FOREIGN KEY (customlistid) REFERENCES customlists(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customlisttracks`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritetracks`
--

CREATE TABLE `favoritetracks` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userid` int(11) NOT NULL,
  `lookupkey` varchar(200) NOT NULL,
  `name` varchar(55) NOT NULL,
  `likedon` datetime NOT NULL DEFAULT current_timestamp(),
  CONSTRAINT fk_favtracks_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE  CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `followedartists`
--

CREATE TABLE `followedartists` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(25) NOT NULL,
  `follower` int(11) NOT NULL,
  `followedon` datetime NOT NULL DEFAULT current_timestamp(),
  `lookupkey` varchar(200) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `passwordresettokens`
--

CREATE TABLE `passwordresettokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `value` longtext NOT NULL,
  `userid` int(11) NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  `expirationdate` datetime NOT NULL,
  CONSTRAINT fk_passrestokens_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE  CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `passwordresettokens`
--
DELIMITER $$
CREATE TRIGGER `resetpass_insert_expiration` BEFORE INSERT ON `passwordresettokens` FOR EACH ROW SET NEW.expirationdate = DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `token` longtext NOT NULL,
  `userid` int(11) NOT NULL,
  `device` longtext NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  `expirationdate` datetime NOT NULL,
  CONSTRAINT fk_sessions_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE  CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Disparadores `sessions`
--
DELIMITER $$
CREATE TRIGGER `session_exp_date` BEFORE INSERT ON `sessions` FOR EACH ROW SET NEW.expirationdate =  DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
$$
DELIMITER ;

-- --------------------------------------------------------
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `customlists`
--
ALTER TABLE `customlists`
  ADD UNIQUE KEY `title` (`title`);

--
-- Indices de la tabla `customlisttracks`
--
ALTER TABLE `customlisttracks`
  ADD UNIQUE KEY `title` (`title`,`artist`,`customlistid`);

--
-- Indices de la tabla `favoritetracks`
--
ALTER TABLE `favoritetracks`
  ADD UNIQUE KEY `userid` (`lookupkey`) USING HASH;

--
-- Indices de la tabla `followedartists`
--
ALTER TABLE `followedartists`
  ADD UNIQUE KEY `name` (`name`,`follower`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `usersettings`
--

ALTER TABLE `usersettings`
ADD UNIQUE KEY `userid_key_value`(`key`,`value`,`userid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
