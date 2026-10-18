
const pool = require("../config/db");

async function saveReview(review) {
  const {
    code,
    language,
    review: reviewText,
    suggestions
  } = review;

  const [result] = await pool.execute(
    `INSERT INTO reviews
      (code, language, review, suggestions)
     VALUES (?, ?, ?, ?)`,
    [
      code || "",
      language || "",
      reviewText || "",
      JSON.stringify(suggestions || [])
    ]
  );

  return result.insertId;
}

async function getReviews() {
  const [rows] = await pool.execute(
    "SELECT * FROM reviews ORDER BY created_at DESC"
  );

  return rows;
}

module.exports = { saveReview, getReviews };
