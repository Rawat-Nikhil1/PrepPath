import React from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview'
import { useState , useRef } from 'react'
import { Navigate, useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const [ jobDescription , setJobDescription ] = useState("")
    const [ selfDescription , setSelfDescription ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async ()=>{
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription , selfDescription , resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if(loading){
        return(
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (

        <main className="home">

            <section className="hero">

                <div className="brand-name">
                    PrepPath
                </div>

                <h1>
                    Build Your Personalized{" "}
                    <span>Preparation Plan</span>
                </h1>

                <p>
                    Analyze your target role, identify your skill gaps, and get
                    a personalized preparation roadmap to become job-ready.
                </p>

            </section>


            <div className="interview-input-group">

                {/* LEFT */}
                <div className="left">

                    <div className="section-heading">
                        <h2>💼 Target Job Description</h2>
                        <span>Required</span>
                    </div>

                    <textarea
                        onChange={(e)=>{
                            setJobDescription(e.target.value)
                        }}
                        name="jobDescription"
                        id="jobDescription"
                        placeholder={`Paste the full job description here...
e.g. "Senior Frontend Engineer at Google requires
proficiency in React, TypeScript, and large-scale system
design..."`}
                    />

                    <div className="character-count">
                        0 / 5000 chars
                    </div>

                </div>


                {/* RIGHT */}
                <div className="right">

                    <div className="section-heading">
                        <h2>👤 Your Profile</h2>
                    </div>


                    <div className="input-group">

                        <p>
                            Upload Resume{" "}
                            <small className="highlight">
                                (Max 5MB)
                            </small>
                        </p>

                        <label
                            className="file-label"
                            htmlFor="resume"
                        >
                            <div className="upload-icon">
                                ☁
                            </div>

                            <strong>
                                Click to upload or drag & drop
                            </strong>

                            <small>
                                PDF or DOCX (Max 5MB)
                            </small>
                        </label>

                        <input
                            ref = { resumeInputRef }
                            hidden
                            type="file"
                            name="resume"
                            id="resume"
                            accept=".pdf,.docx"
                        />

                    </div>


                    <div className="or">
                        <span></span>
                        OR
                        <span></span>
                    </div>


                    <div className="input-group">

                        <label htmlFor="selfDescription">
                            Quick Self-Description
                        </label>

                        <textarea
                            onChange={(e)=>{
                                setSelfDescription(e.target.value)
                            }}
                            name="selfDescription"
                            id="selfDescription"
                            placeholder="Briefly describe your experience, key skills, and years of experience..."
                        />

                    </div>


                    <div className="info-box">
                        ℹ️
                        <span>
                            Either a Resume or a Self Description is required
                            to generate a personalized plan.
                        </span>
                    </div>

                </div>


                {/* BOTTOM */}
                <div className="bottom">

                    <div className="generation-info">
                        <span>AI-Powered Career Preparation</span>
                        <span>•</span>
                        <span>Approx. 30s</span>
                    </div>

                    <button
                        onClick={handleGenerateReport}
                        className="button primary-button">
                        ✨ Generate My Preparation Plan
                    </button>

                </div>

            </div>

            {/* recent report list */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}


            <footer>
                <span>PrepPath</span>
                <span>© 2026</span>
            </footer>

        </main>
    )
}

export default Home