-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 09, 2024 at 11:09 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `actors`
--

CREATE TABLE `actors` (
  `actor_id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL,
  `biography` text COLLATE utf8mb4_unicode_ci,
  `birth_date` datetime DEFAULT NULL,
  `image_url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`actor_id`, `name`, `status`, `biography`, `birth_date`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 'Leonardo DiCaprio', 1, 'An American actor, producer, and environmentalist.', '1974-11-11 00:00:00', 'https://example.com/leonardo.jpg', NULL, NULL),
(2, 'Scarlett Johansson', 1, 'An American actress and singer.', '1984-11-22 00:00:00', 'https://example.com/scarlett.jpg', NULL, NULL),
(3, 'Morgan Freeman', 1, 'An American actor, film director, and narrator.', '1937-06-01 00:00:00', 'https://example.com/morgan.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` bigint UNSIGNED NOT NULL,
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `user_id` bigint UNSIGNED NOT NULL,
  `movie_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `content`, `rating`, `status`, `user_id`, `movie_id`, `created_at`, `updated_at`) VALUES
(1, 'Phim này rất hay update', 9, 1, 1, 1, '2024-10-08 09:14:18', '2024-10-08 09:37:51'),
(2, 'Phim này rất hay user2', 1, 1, 2, 1, '2024-10-08 09:49:43', '2024-10-08 09:49:43');

-- --------------------------------------------------------

--
-- Table structure for table `episodes`
--

CREATE TABLE `episodes` (
  `episode_id` bigint UNSIGNED NOT NULL,
  `status` tinyint NOT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int NOT NULL,
  `release_date` datetime NOT NULL,
  `episode_number` int NOT NULL,
  `movie_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `episodes`
--

INSERT INTO `episodes` (`episode_id`, `status`, `video_url`, `duration`, `release_date`, `episode_number`, `movie_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'videos/q4j3ig4hdnoSxN5GJiMYabhcBt56q0tQ3VNKTaAr.mp4', 20, '2024-10-09 17:24:02', 1, 1, '2024-10-09 10:24:02', '2024-10-09 10:24:02');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `favourite_id` bigint UNSIGNED NOT NULL,
  `added_date` datetime NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `movie_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`favourite_id`, `added_date`, `user_id`, `movie_id`) VALUES
(2, '2024-10-09 17:48:57', 1, 1),
(3, '2024-10-09 17:49:05', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `genre_id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genre_id`, `name`, `status`, `description`) VALUES
(1, 'Action', 1, 'Movies that feature physical feats and stunts.'),
(2, 'Drama', 1, 'Movies that focus on emotional themes and character development.'),
(3, 'Comedy', 1, 'Movies designed to amuse and entertain.'),
(4, 'Horror', 1, 'Movies intended to frighten and evoke fear.'),
(5, 'Sci-Fi', 1, 'Movies that explore futuristic and imaginative concepts.');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `history_id` bigint UNSIGNED NOT NULL,
  `watched_at` datetime NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `episode_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`history_id`, `watched_at`, `user_id`, `episode_id`) VALUES
(1, '2024-10-09 18:02:23', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` bigint UNSIGNED NOT NULL,
  `invoice_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` int NOT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `voucher_id` bigint UNSIGNED DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_id`, `invoice_code`, `total`, `payment_method`, `user_id`, `created_at`, `start_date`, `end_date`, `voucher_id`, `status`) VALUES
(1, 'INV-24701071', 2949999, 'VNPay', 1, '2024-10-09 18:06:49', '2024-10-09 18:06:49', '2025-10-09 18:06:49', 2, 'success');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_09_30_042601_create_voucher_types_table', 1),
(6, '2024_09_30_042602_create_vouchers_table', 1),
(7, '2024_09_30_042603_create_packages_table', 1),
(8, '2024_09_30_042604_create_movie_types_table', 1),
(9, '2024_09_30_042605_create_movies_table', 1),
(10, '2024_09_30_042606_create_actors_table', 1),
(11, '2024_09_30_042607_create_genres_table', 1),
(12, '2024_09_30_042608_create_episodes_table', 1),
(13, '2024_09_30_042609_create_invoices_table', 1),
(14, '2024_09_30_042610_create_histories_table', 1),
(15, '2024_09_30_042611_create_favourites_table', 1),
(16, '2024_09_30_042612_create_comments_table', 1),
(17, '2024_09_30_042613_create_movies_actors_table', 1),
(18, '2024_09_30_042614_create_movies_genres_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `director` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL,
  `rating` decimal(3,2) NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `duration` int NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `banner` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poster` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `favorites_count` int NOT NULL DEFAULT '0',
  `movie_type_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `avatar`, `country`, `director`, `status`, `rating`, `views`, `duration`, `description`, `created_at`, `updated_at`, `banner`, `poster`, `favorites_count`, `movie_type_id`) VALUES
(1, 'The Shawshank Redemption', 'https://example.com/avatar1.jpg', 'Phim Mỹ', 'Frank Darabont', 1, '5.00', 1200000, 142, 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', '2024-10-08 09:09:23', '2024-10-08 09:49:43', 'https://example.com/banner1.jpg', 'https://example.com/poster1.jpg', 500, 1),
(2, 'The Godfather', 'https://example.com/avatar2.jpg', 'Phim Mỹ', 'Francis Ford Coppola', 1, '9.20', 1500000, 175, 'An organized crime dynasty’s aging patriarch transfers control of his clandestine empire to his reluctant son.', '2024-10-08 09:09:23', '2024-10-08 09:09:23', 'https://example.com/banner2.jpg', 'https://example.com/poster2.jpg', 600, 1);

-- --------------------------------------------------------

--
-- Table structure for table `movies_actors`
--

CREATE TABLE `movies_actors` (
  `movie_id` bigint UNSIGNED NOT NULL,
  `actor_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movies_actors`
--

INSERT INTO `movies_actors` (`movie_id`, `actor_id`) VALUES
(1, 1),
(2, 1),
(1, 2),
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `movies_genres`
--

CREATE TABLE `movies_genres` (
  `movie_id` bigint UNSIGNED NOT NULL,
  `genre_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movies_genres`
--

INSERT INTO `movies_genres` (`movie_id`, `genre_id`) VALUES
(1, 1),
(2, 1),
(1, 2),
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `movie_types`
--

CREATE TABLE `movie_types` (
  `movie_type_id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movie_types`
--

INSERT INTO `movie_types` (`movie_type_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Phim Bộ', NULL, NULL),
(2, 'Phim Lẻ', NULL, NULL),
(3, 'Phim Việt Nam', NULL, NULL),
(4, 'Phim Mỹ', NULL, NULL),
(5, 'Phim Hàn Quốc', NULL, NULL),
(6, 'Phim Trung Quốc', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `package_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int NOT NULL,
  `price` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`package_id`, `name`, `duration`, `price`, `created_at`, `updated_at`) VALUES
(1, 'Basic', 1, 10000, '2024-10-08 09:09:23', '2024-10-08 09:09:23'),
(2, 'Standard', 30, 299999, '2024-10-08 09:09:23', '2024-10-08 09:09:23'),
(3, 'Premium', 365, 2999999, '2024-10-08 09:09:23', '2024-10-08 09:09:23');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint UNSIGNED NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('nam','nu') COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` tinyint NOT NULL DEFAULT '0',
  `google_id` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_token` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` enum('local','google') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'local',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `email_verification_token` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `avatar`, `email`, `password`, `gender`, `role`, `google_id`, `access_token`, `provider`, `email_verified_at`, `email_verification_token`, `created_at`, `updated_at`) VALUES
(1, 'User 1', 'https://example.com/avatar1.png', 'admin@example.com', '$2y$12$jgf2JecNvG8SHfsy8n4ks.m.Y.jvJEXP6mwfx7O./tO9N1HOEn8W2', 'nam', 100, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:22', '2024-10-08 09:09:22'),
(2, 'User 2', 'https://example.com/avatar2.png', 'user2@example.com', '$2y$12$JFSMTx5Rg6MJM7qUfaZ7IOvICqLxGc6ZHg/12pqbvb0Y0iIdCn78.', 'nu', 0, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:22', '2024-10-08 09:09:22'),
(3, 'User 3', 'https://example.com/avatar3.png', 'user3@example.com', '$2y$12$gw6Uzj7hmQ8Kk9KINTDDmevJi6j.wVa9Qfb4a3d.t83dwF31/G4KW', 'nam', 0, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:22', '2024-10-08 09:09:22'),
(4, 'User 4', 'https://example.com/avatar4.png', 'user4@example.com', '$2y$12$A3T3O4NCHFFIqaGzRzgOie4W9RbZqJBFhiZblksidLq0ph5RBCWuO', 'nu', 0, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:22', '2024-10-08 09:09:22'),
(5, 'User 5', 'https://example.com/avatar5.png', 'user5@example.com', '$2y$12$AIT7kZyiVkRdzVlhwOm5NuTd/lYM1qpQnzgkywVW6SsXLfkoFcyHW', 'nam', 0, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:22', '2024-10-08 09:09:22'),
(6, 'User 6', 'https://example.com/avatar6.png', 'user6@example.com', '$2y$12$4H/9fFA4RUKTZ9fvdzFR.ueryRKC26VZGUi3lH2AIeUErFBHInFjC', 'nu', 0, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:23', '2024-10-08 09:09:23'),
(7, 'User 7', 'https://example.com/avatar7.png', 'user7@example.com', '$2y$12$ZiFdzmYBb/UtvcsNBmJhD.2AmdWpitEMdvpd8KjxmxJ3hPHM96Cz2', 'nam', 0, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:23', '2024-10-08 09:09:23'),
(8, 'User 8', 'https://example.com/avatar8.png', 'user8@example.com', '$2y$12$XJsNGaBf/cE6TLlZz1PiZOhcTYD2AV5GqPy2U3V8/Ys8q3MLMhcoa', 'nu', 0, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:23', '2024-10-08 09:09:23'),
(9, 'User 9', 'https://example.com/avatar9.png', 'user9@example.com', '$2y$12$vUvaXPjkayld4lR5Vvrgcu9RGHqqLCHHXq0WJ1yzvf9MxDxcdJAEa', 'nam', 0, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:23', '2024-10-08 09:09:23'),
(10, 'User 10', 'https://example.com/avatar10.png', 'user10@example.com', '$2y$12$g7bVhHSsEwLNsuyT2G1pAetCcSUMCBiM6aBvO4RRk8.MU3u2LrrCS', 'nu', 0, NULL, NULL, 'local', NULL, NULL, '2024-10-08 09:09:23', '2024-10-08 09:09:23'),
(11, 'Jin Huynh update', 'link_to_avatar', 'jin@example.com', '$2y$12$WW77M6JE8bI7hZus4p/YuuuCVJtvGCxlT3nJ7EVg6bOtwfYJMfEf.', 'nam', 0, 'google_id_if_any', 'access_token_if_any', 'local', NULL, NULL, '2024-10-08 14:26:04', '2024-10-08 14:28:56'),
(14, 'Jin Chill', NULL, 'jintest@gmail.com', '$2y$12$FLs4PBoL1wS/REOqdWO6Qem1n6z4Jc3Wp.y4Jnc4rlnZcKyj37gZC', 'nam', 0, NULL, NULL, 'local', NULL, 'bQU0ikk3BHaueva6xfAwpYiUQYNYLMZG2MpFZGgRTYCqd0AtmJa9PHE26CGo', '2024-10-08 14:47:07', '2024-10-08 14:47:07'),
(15, 'Em Yêu Anh', NULL, 'emyeuanh@gmail.com', '$2y$12$r0IEUIRgv9Z1Jp0byl9uAuJjaU0ksrLdprXBID3MWHUjX1UiauDkS', 'nu', 0, NULL, NULL, 'local', NULL, '77H6zKwv00Wvp9iZ6oIyJemSi8DXDwVeRVvAC1Blmw9mDAhYPwD0d7OQ9pgz', '2024-10-08 14:48:14', '2024-10-08 14:48:14');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `voucher_id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `voucher_type_id` bigint UNSIGNED NOT NULL,
  `voucher_quantity` int NOT NULL,
  `expired` tinyint(1) NOT NULL DEFAULT '0',
  `enddate` datetime NOT NULL,
  `user_successful_uses` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`voucher_id`, `name`, `voucher_type_id`, `voucher_quantity`, `expired`, `enddate`, `user_successful_uses`) VALUES
(1, 'CODE-10%', 1, 100, 0, '2024-11-07 16:09:23', '[]'),
(2, 'CODE-50K', 2, 49, 0, '2024-12-07 16:09:23', '[1]'),
(3, 'CODE-15%', 3, 30, 0, '2025-01-06 16:09:23', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `voucher_types`
--

CREATE TABLE `voucher_types` (
  `voucher_type_id` bigint UNSIGNED NOT NULL,
  `name` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int NOT NULL,
  `customer_usage_limit` int NOT NULL DEFAULT '1',
  `discount_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `min_spend` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `voucher_types`
--

INSERT INTO `voucher_types` (`voucher_type_id`, `name`, `discount`, `customer_usage_limit`, `discount_type`, `min_spend`, `created_at`, `updated_at`) VALUES
(1, 'Voucher Giảm Giá 10%', 20, 1, 'percentage', 100000, '2024-10-08 09:09:23', '2024-10-08 09:09:23'),
(2, 'Voucher Giảm 50.000 VNĐ', 50000, 1, 'fixed', 50000, '2024-10-08 09:09:23', '2024-10-08 09:09:23'),
(3, 'Voucher Giảm Giá Đơn Hàng Lớn', 15, 1, 'percentage', 200000, '2024-10-08 09:09:23', '2024-10-08 09:09:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`actor_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_movie_id_foreign` (`movie_id`);

--
-- Indexes for table `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`episode_id`),
  ADD KEY `episodes_movie_id_foreign` (`movie_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`favourite_id`),
  ADD KEY `favourites_user_id_foreign` (`user_id`),
  ADD KEY `favourites_movie_id_foreign` (`movie_id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `histories_user_id_foreign` (`user_id`),
  ADD KEY `histories_episode_id_foreign` (`episode_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `invoices_user_id_foreign` (`user_id`),
  ADD KEY `invoices_voucher_id_foreign` (`voucher_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD KEY `movies_movie_type_id_foreign` (`movie_type_id`);

--
-- Indexes for table `movies_actors`
--
ALTER TABLE `movies_actors`
  ADD PRIMARY KEY (`movie_id`,`actor_id`),
  ADD KEY `movies_actors_actor_id_foreign` (`actor_id`);

--
-- Indexes for table `movies_genres`
--
ALTER TABLE `movies_genres`
  ADD PRIMARY KEY (`movie_id`,`genre_id`),
  ADD KEY `movies_genres_genre_id_foreign` (`genre_id`);

--
-- Indexes for table `movie_types`
--
ALTER TABLE `movie_types`
  ADD PRIMARY KEY (`movie_type_id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`voucher_id`),
  ADD KEY `vouchers_voucher_type_id_foreign` (`voucher_type_id`);

--
-- Indexes for table `voucher_types`
--
ALTER TABLE `voucher_types`
  ADD PRIMARY KEY (`voucher_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actors`
--
ALTER TABLE `actors`
  MODIFY `actor_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `episode_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `favourite_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `genre_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `history_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `movie_types`
--
ALTER TABLE `movie_types`
  MODIFY `movie_type_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `package_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `voucher_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `voucher_types`
--
ALTER TABLE `voucher_types`
  MODIFY `voucher_type_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`);

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`),
  ADD CONSTRAINT `favourites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_episode_id_foreign` FOREIGN KEY (`episode_id`) REFERENCES `episodes` (`episode_id`),
  ADD CONSTRAINT `histories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `invoices_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`voucher_id`);

--
-- Constraints for table `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_movie_type_id_foreign` FOREIGN KEY (`movie_type_id`) REFERENCES `movie_types` (`movie_type_id`);

--
-- Constraints for table `movies_actors`
--
ALTER TABLE `movies_actors`
  ADD CONSTRAINT `movies_actors_actor_id_foreign` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`actor_id`),
  ADD CONSTRAINT `movies_actors_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`);

--
-- Constraints for table `movies_genres`
--
ALTER TABLE `movies_genres`
  ADD CONSTRAINT `movies_genres_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`),
  ADD CONSTRAINT `movies_genres_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`);

--
-- Constraints for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD CONSTRAINT `vouchers_voucher_type_id_foreign` FOREIGN KEY (`voucher_type_id`) REFERENCES `voucher_types` (`voucher_type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
