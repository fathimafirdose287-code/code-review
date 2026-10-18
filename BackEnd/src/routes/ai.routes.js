
const express = require("express");
const aiController = require("../controllers/ai.controller");
const reviewRepository = require("../repositories/review.repository");

const router = express.Router();

router.post("/get-review", aiController.getReview);

router.get("/history", async (req, res) => {
  try {
    const reviews = await reviewRepository.getReviews();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch review history" });
  }
});

module.exports = router;
