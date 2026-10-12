PrepPath 🚀
PrepPath is an AI-powered interview preparation platform built with the MERN stack. It helps candidates prepare for a target role by analyzing a job description alongside their resume and/or self-description, then generating a personalized interview report and a tailored resume PDF.
✨ Features
- Personalized interview report based on the target job description and candidate information.
- Job-match score — an AI-generated score from 0 to 100 to help estimate role alignment.
- Technical interview practice — five role-relevant technical questions with the intention behind each question and a suggested answer.
- Behavioral interview practice — five behavioral questions with the intention behind each question and a suggested answer.
- Skill-gap analysis — highlights skills to focus on, with low, medium, or high severity.
- Five-day preparation roadmap — a day-by-day plan with focus areas and tasks.
- ATS-oriented resume PDF generation — generates a job-tailored resume PDF using candidate information and the job description.
- Authentication — registration and login with JWT-based authentication using HTTP-only cookies.
- Saved reports — stores reports in MongoDB so users can revisit their interview plans.
- Resume upload is optional for interview-plan generation — provide a job description and either a self-description or resume.
AI-generated scores, answers, and resume content are suggestions, not guarantees. Review all generated information for accuracy before relying on it or submitting a resume.

🧰 Tech Stack
Frontend
- React 19
- Vite
- React Router
- Axios
- Sass / SCSS
Backend
- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- cookie-parser and CORS
- Multer for in-memory file uploads
- pdf-parse for extracting text from uploaded PDF resumes
AI and PDF generation
- OpenRouter API for structured AI responses
- Zod for validating AI-generated report data
- Puppeteer for HTML-to-PDF generation
🗂️ Project Structure
PrepPath/
├── Backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Authentication and interview handlers
│   │   ├── middlewares/     # Authentication and upload middleware
│   │   ├── models/          # User, report, and token blacklist models
│   │   ├── routes/          # API routes
│   │   └── services/        # AI report and resume PDF generation
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/        # Login and registration
│   │   │   └── interview/   # Plan creation, reports, and API calls
│   │   ├── styles/
│   │   └── main.jsx
│   └── package.json
├── .gitignore
└── README.md
⚙️ Run the Project Locally
Prerequisites
Install or prepare:
- Node.js and npm
- A MongoDB database, local or hosted
- An OpenRouter API key
1. Clone the repository
git clone https://github.com/Rawat-Nikhil1/PrepPath.git
cd PrepPath
2. Configure and run the backend
cd Backend
npm install
Create a Backend/.env file. The backend uses these environment settings:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini
The model setting is optional in the current service; if omitted, the code defaults to openai/gpt-4o-mini. Keep the actual API key, database connection string, and JWT secret private.
Start the backend:
npm run dev
The development script starts server.js using Nodemon. The API is configured for port 3000 by default.
3. Configure and run the frontend
Open a second terminal from the repository root:
cd Frontend
npm install
npm run dev
Vite prints the local development URL in the terminal; it is commonly http://localhost:5173.
The current backend CORS configuration allows the frontend origin http://localhost:5173 and credentials for cookie-based authentication. If you change the frontend or backend URL, update the relevant configuration as well.
🔄 How PrepPath Works
1. Enter the target job description. This is required.
2. Add candidate information. Upload a resume PDF or enter a self-description. For interview-plan generation, the resume upload is optional, but at least one of those candidate inputs is required.
3. Generate the report. The backend extracts text from an uploaded PDF when supplied and sends the available candidate details and job description to the AI service through OpenRouter.
4. Validate the AI response. Zod checks the report structure, including the match score, question sets, skill-gap severity, and preparation roadmap.
5. Save and view the report. The report is stored in MongoDB and can be opened later by the authenticated user.
6. Generate a resume PDF. The report page provides an action to generate a tailored resume PDF using the saved candidate information and job description.
🔌 API Overview
The backend mounts routes under /api.
Method	Endpoint	Purpose
POST	/api/auth/...	Authentication routes (registration/login; see Backend/src/routes/auth.routes.js)
POST	/api/interview/	Generate and save an interview report
GET	/api/interview/report/:interviewId	Fetch one saved report
GET	/api/interview/allreports	Fetch the logged-in user's report summaries
GET	/api/interview/resume/:interviewReportId/pdf	Generate a resume PDF for a saved report


Interview report endpoints require authentication. Consult the route files for the exact authentication endpoint paths and request payloads.
🔐 Security Notes
- Never commit .env files, API keys, database credentials, or JWT secrets.
- Keep secrets in environment variables and use separate credentials for development and production.
- If a credential has ever been pushed to a remote repository, revoke or rotate it. Removing it in a later commit does not erase it from Git history.
- Before deploying, configure production CORS origins, secure cookie settings, environment variables, and upload limits for the deployment environment.
🛣️ Future Improvements
Possible next steps for the project include deployment, automated tests, stronger upload validation, improved error handling, and additional interview practice workflows.
👨‍💻 Author
Nikhil Rawat
B.Tech Computer Science and Engineering
GL Bajaj Institute of Technology & Management
- GitHub profile: Rawat-Nikhil1
- Project repository: PrepPath
