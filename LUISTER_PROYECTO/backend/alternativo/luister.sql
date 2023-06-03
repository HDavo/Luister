SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS `luister`;

CREATE DATABASE IF NOT EXISTS `luister` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `luister`;

CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(25) NOT NULL,
  `email` VARCHAR(55) NOT NULL,
  `password` BLOB NOT NULL,
  `creationdate` DATETIME NOT NULL DEFAULT current_timestamp()
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
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(55) NOT NULL,
  `description` TEXT NOT NULL,
  `image` VARCHAR(100) DEFAULT NULL,
  `userid` INT(11) NOT NULL,
  `creationdate` DATETIME NOT NULL DEFAULT current_timestamp(),
  CONSTRAINT fk_customlists_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE  CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `customlists` (`id`, `title`, `description`, `image`, `userid`, `creationdate`) VALUES
(2, 'rock alternativo', 'canciones de rock alternativo', 'alt-rok.jpg', 1, '2023-05-27 17:57:19'),
(3, 'japon', '', 'con-la-primavera-in-giappone.jpg', 1, '2023-05-28 10:30:48'),
(5, 'africanas', '', 'eg.jpg', 1, '2023-05-28 10:34:15');

CREATE TABLE `customlisttracks` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(55) NOT NULL,
  `artist` TEXT NOT NULL,
  `album` JSON DEFAULT NULL,
  `customlistid` INT(11) NOT NULL,
  `lookupkey` VARCHAR(100) NOT NULL,
  `includedon` DATETIME NOT NULL DEFAULT current_timestamp(),
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
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(55) NOT NULL,
  `artist` VARCHAR(100) NOT NULL,
  `album` VARCHAR(100) NOT NULL,
  `userid` INT(11) NOT NULL,
  `lookupkey` TEXT NOT NULL,
  `includedon` DATETIME NOT NULL DEFAULT current_timestamp(),
  CONSTRAINT fk_favoritetracks_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE  CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `followedartists` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(25) NOT NULL,
  `image` TEXT NOT NULL,
  `follower` INT(11) NOT NULL,
  `lookupkey` TEXT NOT NULL,
  `followedon` DATETIME NOT NULL DEFAULT current_timestamp(),
  CONSTRAINT fk_followedartists_follower FOREIGN KEY (follower) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `passwordresettokens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `value` BLOB NOT NULL,
  `userid` INT(11) NOT NULL,
  `creationdate` DATETIME NOT NULL DEFAULT current_timestamp(),
  `expirationdate` DATETIME NOT NULL,
  CONSTRAINT fk_passwrdresettoken_userid FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER $$
CREATE TRIGGER `resetpass_insert_expiration` BEFORE INSERT ON `passwordresettokens` FOR EACH ROW SET NEW.expirationdate = DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
$$
DELIMITER ;

CREATE TABLE `sessions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `token` BLOB NOT NULL,
  `userid` INT(11) NOT NULL,
  `device` VARCHAR(255) NOT NULL,
  `creationdate` DATETIME NOT NULL DEFAULT current_timestamp(),
  `expirationdate` DATETIME NOT NULL,
  CONSTRAINT fk_sessions_userid FOREIGN KEY (userid) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER $$
CREATE TRIGGER `session_exp_date` BEFORE INSERT ON `sessions` FOR EACH ROW SET NEW.expirationdate =  DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
$$
DELIMITER ;

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

ALTER TABLE `users`
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `usersettings`
  ADD UNIQUE KEY `userid_key_value`(`key`,`value`,`userid`);

COMMIT;