const pdfParse = require("pdf-parse");

const {
    generateInterviewReport,
    generateResumePdf
} = require("../services/ai.service");

const interviewReportModel = require("../models/interviewReport.model");


// Generate an interview report
async function generateInterviewReportController(req, res) {
    let parser;

    try {
        const { selfDescription, jobDescription } = req.body;

        let resumeText = "";

        // Parse the resume only if the user uploaded one.
        if (req.file) {
            if (!req.file.buffer || req.file.buffer.length === 0) {
                return res.status(400).json({
                    message: "Unable to read the uploaded resume."
                });
            }

            parser = new pdfParse.PDFParse({
                data: Uint8Array.from(req.file.buffer)
            });

            const resumeContent = await parser.getText();
            resumeText = resumeContent.text || "";
        }

        // Job description is required.
        if (!jobDescription?.trim()) {
            return res.status(400).json({
                message: "Job description is required."
            });
        }

        // Require at least a resume or self-description.
        if (!resumeText.trim() && !selfDescription?.trim()) {
            return res.status(400).json({
                message: "Please provide a resume or self-description."
            });
        }

        // Generate the report using AI.
        const interviewReportByAI = await generateInterviewReport({
            resume: resumeText,
            selfDescription: selfDescription || "",
            jobDescription: jobDescription.trim()
        });

        // Save the report in MongoDB.
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription: selfDescription || "",
            jobDescription: jobDescription.trim(),
            ...interviewReportByAI
        });

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.error(
            "Interview report generation error:",
            error.response?.data || error.message || error
        );

        return res.status(500).json({
            message: "Failed to generate interview report.",
            error: error.message || "An unexpected error occurred."
        });

    } finally {
        if (parser) {
            try {
                await parser.destroy();
            } catch (cleanupError) {
                console.error(
                    "PDF parser cleanup error:",
                    cleanupError.message
                );
            }
        }
    }
}


// Get one interview report belonging to the logged-in user.
async function getInterviewByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        return res.status(200).json({
            message: "Interview fetched successfully.",
            interviewReport
        });

    } catch (error) {
        console.error(
            "Fetch interview report error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to fetch interview report.",
            error: error.message || "An unexpected error occurred."
        });
    }
}


// Get all interview reports belonging to the logged-in user.
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({
                user: req.user.id
            })
            .sort({ createdAt: -1 })
            .select(
                "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
            );

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        });

    } catch (error) {
        console.error(
            "Fetch all interview reports error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to fetch interview reports.",
            error: error.message || "An unexpected error occurred."
        });
    }
}


// Generate a tailored resume PDF for the logged-in user's report.
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        const {
            resume,
            jobDescription,
            selfDescription
        } = interviewReport;

        // JD is required, and the AI service requires either resume or SD.
        if (!jobDescription?.trim()) {
            return res.status(400).json({
                message: "Job description is missing from this report."
            });
        }

        if (!resume?.trim() && !selfDescription?.trim()) {
            return res.status(400).json({
                message: "A resume or self-description is required to generate a PDF."
            });
        }

        const pdfBuffer = await generateResumePdf({
            resume: resume || "",
            jobDescription,
            selfDescription: selfDescription || ""
        });

        if (
            !Buffer.isBuffer(pdfBuffer) ||
            pdfBuffer.length === 0 ||
            pdfBuffer.subarray(0, 5).toString() !== "%PDF-"
        ) {
            throw new Error("The resume generator did not return a valid PDF.");
        }

        return res
            .status(200)
            .set({
                "Content-Type": "application/pdf",
                "Content-Disposition":
                    `attachment; filename="resume_${interviewReportId}.pdf"`,
                "Content-Length": pdfBuffer.length
            })
            .send(pdfBuffer);

    } catch (error) {
        console.error(
            "Resume PDF generation error:",
            error.response?.data || error.message || error
        );

        return res.status(500).json({
            message: "Failed to generate resume PDF.",
            error: error.message || "An unexpected error occurred."
        });
    }
}


module.exports = {
    generateInterviewReportController,
    getInterviewByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
};
