-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2023 a las 23:06:36
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS `luister`;

CREATE DATABASE IF NOT EXISTS `luister` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `luister`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(25) NOT NULL,
  `email` varchar(55) NOT NULL,
  `password` longtext NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `creationdate`) VALUES
(1, 'Lorenzo', 'dorianwalkler24@gmail.com', '$2y$10$lPSytB9C3aUVLO5n3jDtrOs66gx78R8eeuo0XIuggEfa9vnug7HGy', '2023-05-27 12:19:17');

CREATE TABLE `usersettings` (
`key` VARCHAR(25) NOT NULL,
`value` BOOLEAN NOT NULL,
`userid` INT NOT NULL,
CONSTRAINT fk_usersettings_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `customlists` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(55) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  CONSTRAINT fk_customlists_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE  CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `customlists` (`id`, `title`, `description`, `image`, `userid`, `creationdate`) VALUES
(2, 'rock alternativo', 'canciones de rock alternativo', 'alt-rok.jpg', 1, '2023-05-27 17:57:19'),
(3, 'japon', '', 'con-la-primavera-in-giappone.jpg', 1, '2023-05-28 10:30:48'),
(5, 'africanas', '', 'eg.jpg', 1, '2023-05-28 10:34:15');

CREATE TABLE `customlisttracks` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(55) NOT NULL,
  `artist` varchar(25) NOT NULL,
  `customlistid` int(11) NOT NULL,
  `lookupkey` varchar(100) NOT NULL,
  `includedon` datetime NOT NULL DEFAULT current_timestamp(),
  `album` varchar(100) NOT NULL,
   CONSTRAINT fk_customlisttracks_customlistid FOREIGN KEY (customlistid) REFERENCES customlists(id) ON DELETE  CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `customlisttracks` (`id`, `title`, `artist`, `customlistid`, `lookupkey`, `includedon`, `album`) VALUES
(9, 'Falling Inside the Black', 'Skillet', 2, 'dzr:707229', '2023-06-01 11:39:42', ''),
(10, 'Animal I Have Become', ', Three Days Grace', 2, 'sfy:56sk7jBpZV0CD31G9hEU3b', '2023-06-01 17:19:19', ''),
(11, 'Its All Over', 'Three Days Grace', 2, 'sfy:2QZxpZDfJjhEGclSszvMVX', '2023-06-01 17:21:18', ''),
(12, 'Ojo de Halcón', 'Hoke, Louis Amoeba', 3, 'sfy:0VhfZo2uwcWnQGExuOxNKq', '2023-06-01 17:23:09', ''),
(13, 'Animal I Have Become', 'Three Days Grace', 3, 'sfy:56sk7jBpZV0CD31G9hEU3b', '2023-06-01 18:59:14', ''),
(14, 'Monster', 'Skillet', 2, 'dzr:4116951', '2023-06-01 19:05:50', '');

CREATE TABLE `favoritetracks` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(55) NOT NULL,
  `artist` varchar(100) NOT NULL,
  `album` varchar(100) NOT NULL,
  `userid` int(11) NOT NULL,
  `lookupkey` text NOT NULL,
  `includedon` datetime NOT NULL DEFAULT current_timestamp(),
  CONSTRAINT fk_favoritetracks_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE  CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `followedartists` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(25) NOT NULL,
  `image` text NOT NULL,
  `follower` int(11) NOT NULL,
  `lookupkey` text NOT NULL,
  `followedon` datetime NOT NULL DEFAULT current_timestamp(),
  CONSTRAINT fk_followedartists_follower FOREIGN KEY (follower) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `passwordresettokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `value` longtext NOT NULL,
  `userid` int(11) NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  `expirationdate` datetime NOT NULL,
  CONSTRAINT fk_passwrdresettoken_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER $$
CREATE TRIGGER `resetpass_insert_expiration` BEFORE INSERT ON `passwordresettokens` FOR EACH ROW SET NEW.expirationdate = DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
$$
DELIMITER ;

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `token` longtext NOT NULL,
  `userid` int(11) NOT NULL,
  `device` longtext NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  `expirationdate` datetime NOT NULL,
  CONSTRAINT fk_sessions_userid FOREIGN KEY (userid) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER $$
CREATE TRIGGER `session_exp_date` BEFORE INSERT ON `sessions` FOR EACH ROW SET NEW.expirationdate =  DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
$$
DELIMITER ;

CREATE TABLE `trackalbums` (
  `lookupkey` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `trackartists` (
  `lookupkey` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER $$
CREATE TRIGGER `remove_track_artist` AFTER DELETE ON `customlisttracks` FOR EACH ROW DELETE FROM `trackartists` WHERE OLD.artist = lookupkey
$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `remove_track_album` AFTER DELETE ON `customlisttracks` FOR EACH ROW DELETE FROM `trackalbums` WHERE OLD.album = lookupkey
$$
DELIMITER ;

ALTER TABLE `customlists`
  ADD UNIQUE KEY `title` (`title`,`userid`);

ALTER TABLE `customlisttracks`
  ADD UNIQUE KEY `title` (`title`,`artist`,`customlistid`);

ALTER TABLE `favoritetracks`
  ADD UNIQUE KEY `userid` (`userid`,`title`,`artist`);

ALTER TABLE `followedartists`
  ADD UNIQUE KEY `name` (`name`,`follower`);

ALTER TABLE `passwordresettokens`
  ADD UNIQUE KEY `value` (`value`) USING HASH;

ALTER TABLE `sessions`
  ADD UNIQUE KEY `token` (`token`) USING HASH;

ALTER TABLE `trackalbums`
  ADD UNIQUE KEY `lookupkey` (`lookupkey`,`title`);

ALTER TABLE `trackartists`
  ADD UNIQUE KEY `lookupkey` (`lookupkey`,`name`);

ALTER TABLE `users`
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `usersettings`
  ADD UNIQUE KEY `userid_key_value`(`key`,`value`,`userid`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
