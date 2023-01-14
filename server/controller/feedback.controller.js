const { Feedback } = require("../model/feedback.model");

async function httpCreateFeedBack(req, res) {
  try {
    let { name, feedback } = req.body;
    if (!(name && feedback)) {
      res.status(400).json({
        message: "All fields required!",
        status: "Failed",
      });
      return;
    }
    const feedBack = new Feedback({ ...req.body });
    await feedBack.save();
    res.status(200).json({
      message: "Thanks for your feedback!",
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = { httpCreateFeedBack };
