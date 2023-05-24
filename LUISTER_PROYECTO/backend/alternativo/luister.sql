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
(74, 'Musica EG', 'musica EG', 'eg.jpg', 23, '2023-05-20 17:01:23'),
(75, 'Japon', 'Musica japonesa', 'con-la-primavera-in-giappone.jpg', 23, '2023-05-20 18:08:56'),
(76, 'rock alternativo', 'Lista de canciones de grupos de rock alternativo', 'alt-rok.jpg', 23, '2023-05-20 18:45:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customlisttracks`
--

CREATE TABLE `customlisttracks` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `artist` varchar(200) NOT NULL,
  `customlistid` int(11) NOT NULL,
  `lookupkey` varchar(255) NOT NULL,
  `includedon` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customlisttracks`
--

INSERT INTO `customlisttracks` (`id`, `title`, `artist`, `customlistid`, `lookupkey`, `includedon`) VALUES
(6, 'Kill Bill', 'SZA', 76, '1Qrg8KqiBpW07V7PNxwwwL', '2023-05-21 23:17:36'),
(7, 'Flowers', 'Miley Cyrus', 76, '4DHcnVTT87F0zZhRPYmZ3B', '2023-05-21 23:17:54'),
(8, 'Ella Baila Sola', 'Eslabon ArmadoPeso Pluma', 76, '3qQbCzHBycnDpGskqOWY0E', '2023-05-21 23:21:35'),
(11, 'Ella Baila Sola', 'Eslabon ArmadoPeso Pluma', 75, '3qQbCzHBycnDpGskqOWY0E', '2023-05-21 23:22:54'),
(12, 'Ella Baila Sola', 'Eslabon ArmadoPeso Pluma', 74, '3qQbCzHBycnDpGskqOWY0E', '2023-05-21 23:22:59'),
(13, 'WHERE SHE GOES', 'Bad Bunny', 76, '7ro0hRteUMfnOioTFI5TG1', '2023-05-21 23:24:01'),
(14, 'Daylight', 'David Kushner', 76, '1odExI7RdWc4BT515LTAwj', '2023-05-21 23:24:33'),
(15, 'un x100to', 'Grupo FronteraBad Bunny', 75, '6pD0ufEQq0xdHSsRbg9LBK', '2023-05-25 01:09:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritetracks`
--

CREATE TABLE `favoritetracks` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `lookupkey` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `likedon` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `followedartists`
--

CREATE TABLE `followedartists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `follower` int(11) NOT NULL,
  `followedon` datetime NOT NULL DEFAULT current_timestamp(),
  `lookupkey` text NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `passwordresettokens`
--

CREATE TABLE `passwordresettokens` (
  `id` int(11) NOT NULL,
  `value` longtext NOT NULL,
  `userid` int(11) NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  `expirationdate` datetime NOT NULL
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
(113, 'df0bd301e77362a2989c51e5d2a57514', 23, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36', '2023-05-24 21:54:20', '2023-05-31 21:54:20');

--
-- Disparadores `sessions`
--
DELIMITER $$
CREATE TRIGGER `dateinsert` BEFORE INSERT ON `sessions` FOR EACH ROW SET NEW.expirationdate =  DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
$$
DELIMITER ;

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
(1, 'luke skywalker', 'luke@sky.walker.com', '$2y$10$6P9sjH1YxdakGd2ELE7/KuCvN66ceKpe0L/toPUeWb0yUPaWYquOm', '2023-05-12 14:07:46'),
(23, 'dorian walker', 'dorianwalkler24@gmail.com', '$2y$10$kBcCfk75D9/u8bTc.0A5nuMDEsiXxKwSH1tYSbTDuIeVnIkZHo8N.', '2023-05-20 11:22:10');

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
-- Indices de la tabla `customlisttracks`
--
ALTER TABLE `customlisttracks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`,`artist`,`customlistid`);

--
-- Indices de la tabla `favoritetracks`
--
ALTER TABLE `favoritetracks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userid` (`userid`,`lookupkey`) USING HASH;

--
-- Indices de la tabla `followedartists`
--
ALTER TABLE `followedartists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`,`follower`);

--
-- Indices de la tabla `passwordresettokens`
--
ALTER TABLE `passwordresettokens`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `customlists`
--
ALTER TABLE `customlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `customlisttracks`
--
ALTER TABLE `customlisttracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `favoritetracks`
--
ALTER TABLE `favoritetracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `followedartists`
--
ALTER TABLE `followedartists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `passwordresettokens`
--
ALTER TABLE `passwordresettokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
