import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})


/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data

}


/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}


/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/allreports")

    return response.data
}


/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */


export const generateResumePdf = async (interviewReportId) => {
    const response = await api.get(
        `/api/interview/resume/${interviewReportId}/pdf`,
        {
            responseType: "blob"
        }
    );

    // Check whether the server returned an error instead of a PDF.
    if (response.data.type !== "application/pdf") {
        const errorText = await response.data.text();
        throw new Error(errorText || "The server did not return a valid PDF.");
    }

    // Create a downloadable PDF file.
    const downloadUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = `resume_${interviewReportId}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Release the URL after the browser has started the download.
    setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
    }, 1000);

    return response.data;
};

