-- =============================================================================
-- ATV Precision Components Pvt. Ltd. - Database Schema & Backend Queries
-- Database: atv_precision_db
-- Version: 1.0.0
-- Compatible with: MySQL 8.0+, MariaDB 10.4+, PostgreSQL (syntax noted)
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `atv_precision_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `atv_precision_db`;

-- =============================================================================
-- 1. TABLE: contact_inquiries
-- Stores customer submissions, RFQs, and messages from the Contact Us page
-- =============================================================================

DROP TABLE IF EXISTS `contact_inquiries`;

CREATE TABLE `contact_inquiries` (
  `id` VARCHAR(36) NOT NULL COMMENT 'Unique identifier (e.g. INQ-MLX89A or UUID)',
  `name` VARCHAR(150) NOT NULL COMMENT 'Full name of the sender',
  `email` VARCHAR(150) NOT NULL COMMENT 'Contact email address',
  `phone` VARCHAR(50) DEFAULT NULL COMMENT 'Contact telephone / mobile number',
  `company` VARCHAR(150) DEFAULT NULL COMMENT 'Company / Organization name',
  `subject` VARCHAR(100) NOT NULL DEFAULT 'General Enquiry' COMMENT 'Subject dropdown selection',
  `message` TEXT NOT NULL COMMENT 'Detailed message / RFQ specification',
  `status` ENUM('New', 'In Review', 'Completed') NOT NULL DEFAULT 'New' COMMENT 'Lifecycle status in admin portal',
  `admin_notes` TEXT DEFAULT NULL COMMENT 'Internal notes added by admin team',
  `ip_address` VARCHAR(45) DEFAULT NULL COMMENT 'Client IPv4/IPv6 address',
  `user_agent` VARCHAR(255) DEFAULT NULL COMMENT 'Browser user agent string',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Submission timestamp',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last modification timestamp',
  PRIMARY KEY (`id`),
  INDEX `idx_inquiries_status` (`status`),
  INDEX `idx_inquiries_created` (`created_at` DESC),
  INDEX `idx_inquiries_email` (`email`),
  FULLTEXT INDEX `ft_inquiries_search` (`name`, `company`, `subject`, `message`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =============================================================================
-- 2. TABLE: admin_users
-- Stores administrator credentials for the Admin Dashboard
-- Default credential password hash is for: atv@2026
-- =============================================================================

DROP TABLE IF EXISTS `admin_users`;

CREATE TABLE `admin_users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `role` ENUM('superadmin', 'admin', 'viewer') NOT NULL DEFAULT 'admin',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =============================================================================
-- 3. SEED DATA
-- Default administrator account and sample customer inquiries
-- =============================================================================

-- Default admin account (Username: admin | Password: atv@2026)
INSERT INTO `admin_users` (`username`, `password_hash`, `full_name`, `email`, `role`, `is_active`) VALUES
('admin', '$2a$12$K1d0F11M2qX4J.b8E1L1weJq0sVqRzXWfW4kH.wGf8qY5c9wY8b4m', 'ATV Administrator', 'admin@atvmanufacturing.com', 'superadmin', 1);

-- Sample client inquiries
INSERT INTO `contact_inquiries` (`id`, `name`, `email`, `phone`, `company`, `subject`, `message`, `status`, `created_at`) VALUES
('INQ-1A8B9C', 'Ramesh Sundaram', 'ramesh.s@daimler-supply.com', '+91 98401 23456', 'Daimler Tier-1 Component Sourcing', 'Manufacturing Consultation', 'Looking for 15,000 units/month precision fine-blanked brake brackets in high-tensile steel. Please share RFQ submission guidelines and quality documentation.', 'New', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
('INQ-2D3E4F', 'Marcus Vance', 'm.vance@garrettmotion.com', '+1 415 890 2234', 'Garrett Advancing Motion Inc.', 'Request a Quote', 'Requesting quote for turbocharger actuator rod assemblies based on drawing reference 738406-0089. Annual estimated volume: 120,000 pcs.', 'In Review', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('INQ-3G4H5J', 'K. V. Narayanan', 'kvn@brakesindia.co.in', '+91 94440 98765', 'Brakes India (TVS Group)', 'Product Information', 'Inquiring regarding current press capacity on the Feintool SMG for 6.0mm high-flatness caliper plates.', 'Completed', DATE_SUB(NOW(), INTERVAL 3 DAY));


-- =============================================================================
-- 4. ESSENTIAL BACKEND SQL QUERIES (READY FOR BACKEND API IMPLEMENTATION)
-- =============================================================================

-- Query 1: Insert new contact inquiry from the website form
-- Used by: POST /api/contact
-- Parameters: :id, :name, :email, :phone, :company, :subject, :message, :ip_address
/*
INSERT INTO `contact_inquiries`
  (`id`, `name`, `email`, `phone`, `company`, `subject`, `message`, `status`, `ip_address`)
VALUES
  (?, ?, ?, ?, ?, ?, ?, 'New', ?);
*/

-- Query 2: Fetch all inquiries for the Admin Dashboard (newest first)
-- Used by: GET /api/admin/inquiries
/*
SELECT
  `id`,
  `name`,
  `email`,
  `phone`,
  `company`,
  `subject`,
  `message`,
  `status`,
  `admin_notes`,
  `created_at`,
  `updated_at`
FROM `contact_inquiries`
ORDER BY `created_at` DESC;
*/

-- Query 3: Filter inquiries by lifecycle status
-- Used by: GET /api/admin/inquiries?status=New
/*
SELECT *
FROM `contact_inquiries`
WHERE `status` = ?
ORDER BY `created_at` DESC;
*/

-- Query 4: Search inquiries across name, email, company, and message
-- Used by: GET /api/admin/inquiries/search?q=:searchTerm
/*
SELECT *
FROM `contact_inquiries`
WHERE `name` LIKE CONCAT('%', ?, '%')
   OR `email` LIKE CONCAT('%', ?, '%')
   OR `company` LIKE CONCAT('%', ?, '%')
   OR `subject` LIKE CONCAT('%', ?, '%')
   OR `message` LIKE CONCAT('%', ?, '%')
ORDER BY `created_at` DESC;
*/

-- Query 5: Update inquiry status (New -> In Review -> Completed)
-- Used by: PATCH /api/admin/inquiries/:id/status
/*
UPDATE `contact_inquiries`
SET `status` = ?, `updated_at` = CURRENT_TIMESTAMP
WHERE `id` = ?;
*/

-- Query 6: Metric counts for Admin Dashboard top cards
-- Used by: GET /api/admin/metrics
/*
SELECT
  COUNT(*) AS total_count,
  SUM(CASE WHEN `status` = 'New' THEN 1 ELSE 0 END) AS new_count,
  SUM(CASE WHEN `status` = 'In Review' THEN 1 ELSE 0 END) AS in_review_count,
  SUM(CASE WHEN `status` = 'Completed' THEN 1 ELSE 0 END) AS completed_count
FROM `contact_inquiries`;
*/

-- Query 7: Delete inquiry record
-- Used by: DELETE /api/admin/inquiries/:id
/*
DELETE FROM `contact_inquiries`
WHERE `id` = ?;
*/

