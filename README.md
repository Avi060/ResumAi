# ResumAi — AI-Powered Resume Analyzer & Manager

---

## Introduction

ResumAi is a modern, browser-based tool that helps job seekers upload, manage, and analyze resumes with AI-powered ATS scoring and personalized feedback — all without a backend. This lightweight, serverless platform leverages cutting-edge frontend tech combined with Puter.js to deliver an accessible and powerful resume assistant.

---

## Overview

In today’s competitive job market, tailoring your resume to specific job descriptions is key. However, many job seekers struggle with getting meaningful feedback or managing multiple resume versions.

ResumAi solves these issues by enabling users to:

- Upload resumes with optional job title, company, and description tags  
- Get real-time AI feedback and ATS scoring  
- Securely store and manage resumes via cloud storage (Puter.com)  
- Access everything directly from the browser, no servers or databases required

---

## Features

- Serverless user authentication with Puter.js  
- Resume upload and tagging (job title, company, job description)  
- AI-powered ATS scoring and actionable feedback  
- Resume dashboard with management tools (view, delete, download)  
- Responsive design for all devices  
- Built with reusable, modular components

---

## Tech Stack

| Technology      | Purpose                          |
|-----------------|---------------------------------|
| React           | UI components                   |
| React Router v7 | Client-side routing             |
| Puter.js        | Serverless auth, AI, storage   |
| Puter.com       | Cloud storage                  |
| Tailwind CSS    | Styling                        |
| shadcn/ui       | Accessible UI components       |
| TypeScript      | Type safety                   |
| Vite            | Fast development/build tool    |
| Zustand         | State management               |

---

## How It Works

1. **User Authentication:** Secure login via Puter.js, fully client-side.  
2. **Resume Upload:** Upload resumes and optionally tag with job info.  
3. **AI Analysis:** Resume is scored and analyzed with AI for feedback.  
4. **Dashboard:** Manage, view, and organize all uploaded resumes.

---

## Setup & Installation

```bash
git clone https://github.com/Avi060/ResumAi.git
cd ResumAi
npm install
npm run dev

---

Open http://localhost:5173 in your browser to get started.