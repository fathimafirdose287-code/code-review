CREATE DATABASE IF NOT EXISTS code_review_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE code_review_db;

CREATE TABLE IF NOT EXISTS code_submissions (
  submission_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  source_code MEDIUMTEXT NOT NULL,
  language VARCHAR(50) NOT NULL DEFAULT 'javascript',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (submission_id),
  INDEX idx_code_submissions_created_at (created_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS code_reviews (
  review_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  submission_id BIGINT UNSIGNED NOT NULL,
  review_result MEDIUMTEXT NOT NULL,
  status ENUM('completed') NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (review_id),
  INDEX idx_code_reviews_created_at (created_at),
  CONSTRAINT fk_code_reviews_submission
    FOREIGN KEY (submission_id)
    REFERENCES code_submissions(submission_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;
