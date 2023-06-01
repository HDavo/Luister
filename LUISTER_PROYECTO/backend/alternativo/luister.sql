-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2023 a las 20:45:02
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

DROP DATABASE luister;

CREATE DATABASE luister;

USE luister;


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
  `title` varchar(55) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customlists`
--

INSERT INTO `customlists` (`id`, `title`, `description`, `image`, `userid`, `creationdate`) VALUES
(2, 'rock alternativo', 'canciones de rock alternativo', 'alt-rok.jpg', 1, '2023-05-27 17:57:19'),
(3, 'japon', '', 'con-la-primavera-in-giappone.jpg', 1, '2023-05-28 10:30:48'),
(5, 'africanas', 'null', 'eg.jpg', 1, '2023-05-28 10:34:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customlisttracks`
--

CREATE TABLE `customlisttracks` (
  `id` int(11) NOT NULL,
  `title` varchar(55) NOT NULL,
  `artist` varchar(25) NOT NULL,
  `customlistid` int(11) NOT NULL,
  `lookupkey` varchar(100) NOT NULL,
  `includedon` datetime NOT NULL DEFAULT current_timestamp(),
  `album` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customlisttracks`
--

INSERT INTO `customlisttracks` (`id`, `title`, `artist`, `customlistid`, `lookupkey`, `includedon`, `album`) VALUES
(9, 'Falling Inside the Black', 'Skillet', 2, 'dzr:707229', '2023-06-01 11:39:42', ''),
(10, 'Animal I Have Become', ', Three Days Grace', 2, 'sfy:56sk7jBpZV0CD31G9hEU3b', '2023-06-01 17:19:19', ''),
(11, 'It\'s All Over', 'Three Days Grace', 2, 'sfy:2QZxpZDfJjhEGclSszvMVX', '2023-06-01 17:21:18', ''),
(12, 'Ojo de Halcón', 'Hoke, Louis Amoeba', 3, 'sfy:0VhfZo2uwcWnQGExuOxNKq', '2023-06-01 17:23:09', ''),
(13, 'Animal I Have Become', 'Three Days Grace', 3, 'sfy:56sk7jBpZV0CD31G9hEU3b', '2023-06-01 18:59:14', ''),
(14, 'Monster', 'Skillet', 2, 'dzr:4116951', '2023-06-01 19:05:50', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritetracks`
--

CREATE TABLE `favoritetracks` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `lookupkey` text NOT NULL,
  `title` varchar(55) NOT NULL,
  `includedon` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritetracks`
--

INSERT INTO `favoritetracks` (`id`, `userid`, `lookupkey`, `title`, `includedon`) VALUES
(16, 1, 'sfy:56sk7jBpZV0CD31G9hEU3b', 'Animal I Have Become', '2023-06-01 13:53:21'),
(17, 1, 'sfy:2QZxpZDfJjhEGclSszvMVX', 'It\'s All Over', '2023-06-01 13:53:32'),
(18, 1, 'sfy:0M955bMOoilikPXwKLYpoi', 'I Hate Everything About You', '2023-06-01 13:54:06'),
(19, 1, 'sfy:4I116SyJOoimDfIZBIOiiA', 'Take Me Under', '2023-06-01 13:54:31'),
(20, 1, 'sfy:6OMO6WdRhSfjMPAiPT94wH', 'Painkiller', '2023-06-01 13:54:47'),
(21, 1, 'sfy:4AVxmpwfXH7p4YyTbg9nS4', 'Falling Inside the Black', '2023-06-01 13:56:31'),
(22, 1, 'dzr:707229', 'Falling Inside the Black', '2023-06-01 19:03:07'),
(23, 1, 'dzr:707204', 'Yours to Hold', '2023-06-01 19:03:20'),
(24, 1, 'dzr:707194', 'Rebirthing', '2023-06-01 19:04:32'),
(25, 1, 'dzr:707198', 'The Last Night', '2023-06-01 19:04:51'),
(26, 1, 'dzr:4116953', 'Awake and Alive', '2023-06-01 19:08:34'),
(28, 1, 'sfy:49WLgjpFzrF2gCBZzWw1iv', 'Papercut', '2023-06-01 19:20:04'),
(29, 1, 'sfy:1qIQeMHFw09UjBpgrsrdys', 'One Step Closer', '2023-06-01 19:20:32'),
(30, 1, 'sfy:6NPVVeHetUBa6NhYSaMo1w', 'With You', '2023-06-01 19:20:38'),
(31, 1, 'sfy:1BfzeCKzo8xSvJcYLmnP8f', 'Crawling', '2023-06-01 19:20:46'),
(32, 1, 'sfy:0NiLFbppboKW7fmsG1fKmF', 'P5hng Me A*wy (Mike Shinoda Reanimation) [feat. Stephen', '2023-06-01 19:20:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `followedartists`
--

CREATE TABLE `followedartists` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `follower` int(11) NOT NULL,
  `followedon` datetime NOT NULL DEFAULT current_timestamp(),
  `lookupkey` text NOT NULL,
  `image` text NOT NULL
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
(8, '5fff68b3989225787882bc76c93b47a9', 1, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', '2023-06-01 11:18:28', '2023-06-08 11:18:28');

--
-- Disparadores `sessions`
--
DELIMITER $$
CREATE TRIGGER `session_exp_date` BEFORE INSERT ON `sessions` FOR EACH ROW SET NEW.expirationdate =  DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trackalbum`
--

CREATE TABLE `trackalbum` (
  `lookupkey` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(55) NOT NULL,
  `password` longtext NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `creationdate`) VALUES
(1, 'Lorenzo', 'dorianwalkler24@gmail.com', '$2y$10$lPSytB9C3aUVLO5n3jDtrOs66gx78R8eeuo0XIuggEfa9vnug7HGy', '2023-05-27 12:19:17');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
