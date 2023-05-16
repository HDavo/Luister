-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2023 a las 23:31:58
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
CREATE DATABASE luister;

USE luister;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customlists`
--

CREATE TABLE `customlists` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customlists`
--

INSERT INTO `customlists` (`id`, `title`, `description`, `image`, `userid`, `creationdate`) VALUES
(15, 'Canciones de EG', 'Canciones de guinea ma nigga', 'eg.jpg', 1, '2023-05-16 22:31:11'),
(20, 'JAPON', 'Lista con musica japonesa', 'con-la-primavera-in-giappone.jpg', 1, '2023-05-16 23:14:53'),
(21, 'Rock alternativo', 'Lista de musica rock ', 'alt-rok.jpg', 1, '2023-05-16 23:18:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `token` longtext NOT NULL,
  `userid` int(11) NOT NULL,
  `device` longtext NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  `expirationdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `token`, `userid`, `device`, `creationdate`, `expirationdate`) VALUES
(9, '272b2914eb5e5687279314accfcf55ae', 1, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36', '2023-05-16 23:22:42', '2023-05-23 23:22:42');

--
-- Disparadores `sessions`
--
DELIMITER $$
CREATE TRIGGER `dateinsert` BEFORE INSERT ON `sessions` FOR EACH ROW SET NEW.expirationdate =  DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tracks`
--

CREATE TABLE `tracks` (
  `lookupkey` varchar(255) NOT NULL,
  `customlistid` int(11) NOT NULL,
  `includedon` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` longtext NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `creationdate`) VALUES
(1, 'luke skywalker', 'luke@sky.walker.com', '$2y$10$6P9sjH1YxdakGd2ELE7/KuCvN66ceKpe0L/toPUeWb0yUPaWYquOm', '2023-05-12 14:07:46');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `customlists`
--
ALTER TABLE `customlists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`lookupkey`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `customlists`
--
ALTER TABLE `customlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
