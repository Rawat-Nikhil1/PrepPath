
const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

// Generate an interview report
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController);

// Get one interview report
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewByIdController);

// Get all interview reports
interviewRouter.get("/allreports", authMiddleware.authUser, interviewController.getAllInterviewReportsController);

// Generate a resume PDF
interviewRouter.get("/resume/:interviewReportId/pdf", authMiddleware.authUser, interviewController.generateResumePdfController);

module.exports = interviewRouter;
