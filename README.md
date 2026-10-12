# 🚀 PrepPath

**PrepPath** is an AI-powered interview preparation platform built with the MERN stack. It helps candidates prepare for a target role by analyzing a job description alongside their resume and/or self-description, then generating a personalized interview report and a tailored resume PDF.

## ✨ Features

- 🎯 **Personalized Interview Report** — Generate a report based on the target job description and candidate information.
- 📊 **Job-Match Score** — Get an AI-generated score from 0 to 100 to estimate role alignment.
- 💻 **Technical Interview Practice** — Five role-relevant technical questions with suggested answers.
- 🗣️ **Behavioral Interview Practice** — Five behavioral questions with suggested answers.
- 🔍 **Skill-Gap Analysis** — Identify skills to improve, categorized by severity.
- 📅 **Five-Day Preparation Roadmap** — Follow a day-by-day plan with focus areas and tasks.
- 📄 **ATS-Friendly Resume PDF** — Generate a job-tailored resume PDF.
- 🔐 **Authentication** — Register and log in using JWT-based authentication and HTTP-only cookies.
- 📚 **Saved Interview Reports** — Store reports in MongoDB and revisit previous interview plans.
- 📎 **Optional Resume Upload** — Use a job description and either a self-description or resume.

> ⚠️ AI-generated scores, answers, and resume content are suggestions, not guarantees. Review generated information for accuracy before using it.

## 🛠️ Tech Stack

### 🎨 Frontend

- React 19
- Vite
- React Router
- Axios
- Sass / SCSS

### ⚙️ Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- `cookie-parser`
- CORS
- Multer
- `pdf-parse`

### 🤖 AI & PDF Generation

- OpenRouter API
- Zod
- Puppeteer

## 🗂️ Project Structure

```text
PrepPath/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── interview/
│   │   ├── styles/
│   │   └── main.jsx
│   └── package.json
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### 📋 Prerequisites

- [Node.js](https://nodejs.org/) and npm
- MongoDB database
- [OpenRouter API key](https://openrouter.ai/)

### 📥 1. Clone the Repository

```bash
git clone https://github.com/Rawat-Nikhil1/PrepPath.git
cd PrepPath
```

### 🖥️ 2. Configure the Backend

```bash
cd Backend
npm install
```

Create a `Backend/.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini
```

The model variable is optional if the application uses `openai/gpt-4o-mini` as its default. Never publish your actual API keys or credentials.

Start the backend:

```bash
npm run dev
```

### 🌐 3. Configure the Frontend

Open another terminal from the project root:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL provided by Vite, commonly `http://localhost:5173`.

## 🔄 How PrepPath Works

1. 📝 Enter the target job description.
2. 👤 Provide a self-description, upload a resume PDF, or provide both.
3. 🤖 The backend sends the available candidate information and job description to the OpenRouter AI service.
4. ✅ Zod validates the generated report structure.
5. 📊 Review the match score, technical and behavioral questions, skill gaps, and preparation roadmap.
6. 💾 Save and revisit reports stored in MongoDB.
7. 📄 Generate a tailored resume PDF.

## 🔌 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/...` | Authentication routes |
| `POST` | `/api/interview/` | Generate and save an interview report |
| `GET` | `/api/interview/report/:interviewId` | Fetch a saved report |
| `GET` | `/api/interview/allreports` | Fetch the logged-in user's reports |
| `GET` | `/api/interview/resume/:interviewReportId/pdf` | Generate a resume PDF |

🔐 Interview report endpoints require authentication. Refer to the backend route files for exact authentication paths and request payloads.

## 🔐 Security Notes

- Never commit `.env` files, API keys, database credentials, or JWT secrets.
- Store sensitive configuration in environment variables.
- Rotate any credentials that have been exposed.
- Configure CORS, secure cookies, and upload limits appropriately before deployment.

## 🚧 Future Improvements

- ☁️ Deploy the application.
- 🧪 Add automated tests.
- 🛡️ Improve file-upload validation and error handling.
- 🎤 Expand interview practice features.

## 👨‍💻 Author

**Nikhil Rawat**

🎓 B.Tech Computer Science and Engineering  
🏫 GL Bajaj Institute of Technology & Management

- 🐙 **GitHub Profile:** [Rawat-Nikhil1](https://github.com/Rawat-Nikhil1)
- 📂 **Project Repository:** [PrepPath](https://github.com/Rawat-Nikhil1/PrepPath)
