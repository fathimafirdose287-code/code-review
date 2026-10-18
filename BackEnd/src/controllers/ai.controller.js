
const aiService = require("../services/ai.service");
const reviewRepository = require("../repositories/review.repository");

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).send("Prompt is required");
    }

    const response = await aiService(code);

    await reviewRepository.saveReview({
      code,
      language: req.body.language || "",
      review: typeof response === "string"
        ? response
        : JSON.stringify(response),
      suggestions: []
    });

    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to review code");
  }
};
