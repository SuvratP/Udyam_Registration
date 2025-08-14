
# Udyam Registration 

This project replicates the first two steps of the Udyam registration portal, including Aadhaar verification with OTP and PAN verification, using React for frontend and Node.js/ for backend.



## Features

Web Scraping of Udyam portal fields

Dynamic UI rendering with React

OTP verification for Aadhaar

PAN validation with regex

Progress tracker for multi-step form

Mobile-first, fully responsive layout


## Installation

Install my-project with npm

```bash
# Clone the repo
git clone <https://github.com/SuvratP/Udyam_Registration>

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup
cd Frontend
npm install
npm run dev


```
    
## Usage
1. Open http://localhost:5173 in your browser.
2. Complete Aadhaar details and verify OTP.
3. Enter PAN details and submit.
4. Check progress tracker and final success message.

## Deployment

Frontend controlled by backend on vercel

```bash
 https://udyam-registration-beta.vercel.app/
```

Backend on Render

```bash
https://udyam-backend-sw8y.onrender.com
```


## Tech Stack

- React.js
- Node.js / Express
- MongoDb
- Tailwind CSS
- Axios / Fetch API
- Jest (Testing)



## API

POST /api/aadhaar  → Aadhaar verification

POST /api/pan     → PAN verification

POST /api/verify-otp    → OTP verification


-----

## 📂 Project Structure

Here is an overview of the project's directory and file structure.

```
.
├── 📁 backend/
│   # Contains the Node.js + Express.js server logic
│   ├── 📁 models/
│   │   └── 📄 Registration.js       # Mongoose schema for user registrations
│   ├── 📁 node_modules/
│   ├── 📁 routes/
│   │   └── 📄 registrationRoutes.js   # API routes for registration
│   ├── 📁 tests/
│   │   ├── 📄 aadhaar.test.js
│   │   ├── 📄 api.test.js
│   │   ├── 📄 pan.test.js
│   │   └── 📄 validation.test.js
│   ├── 📁 validation/                 # Input validation logic
│   ├── 📄 .env                       # Environment variables
│   ├── 📄 .gitignore
│   ├── 📄 app.js                     # Express application setup and middleware
│   ├── 📄 db.js                       # Database connection logic
│   ├── 📄 jest.config.js              # Jest test runner configuration
│   ├── 📄 package.json
│   ├── 📄 server.js                   # Server entry point
│   └── ...                         # Other configuration files
│
├── 📁 Frontend/
│   # Contains the React + Vite client-side application
│   ├── 📁 node_modules/
│   ├── 📁 public/                    # Static assets (images, fonts, etc.)
│   ├── 📁 src/                       # Main source code for the React app
│   │   ├── 📁 assets/
│   │   ├── 📁 components/             # Reusable React components
│   │   │   ├── 📄 DynamicForm.jsx
│   │   │   ├── 📄 FormField.jsx
│   │   │   ├── 📄 OTPVerification.jsx
│   │   │   └── 📄 Adhar_verification.json # JSON structure for Aadhaar form
│   │   ├── 📄 App.css
│   │   ├── 📄 App.jsx                  # Main application component
│   │   ├── 📄 index.css                # Global styles
│   │   ├── 📄 main.jsx                  # Application entry point
│   │   └── 📄 PAN_Verification.json    # JSON structure for PAN form
│   ├── 📄 .gitignore
│   ├── 📄 eslint.config.js
│   ├── 📄 index.html                  # Main HTML file for the app
│   ├── 📄 package.json
│   ├── 📄 README.md
│   └── 📄 vite.config.js              # Vite bundler configuration
│
└── 📁 scraper/
    # Contains standalone scripts for data scraping
    ├── 📁 node_modules/
    ├── 📄 .gitignore
    ├── 📄 aadhar_form.json            # JSON payload for Aadhaar scraping
    ├── 📄 Aadhar.js                   # Aadhaar scraping logic
    ├── 📄 package.json
    ├── 📄 pan_form.json               # JSON payload for PAN scraping
    ├── 📄 Pan.js                      # PAN scraping logic
    └── 📄 readme.md
```
## Running Tests

To run tests, run the following command

```bash
  cd backend
  npm run test
```

- Form validation tested with Jest
- Edge cases: invalid Aadhaar, invalid PAN, empty fields
- API endpoints tested with POST requests



## Web Scraping (Step 1 & 2)

**Description:**  
As part of the project, we performed web scraping on the first two steps of the Udyam registration portal to extract all input fields, labels, validation rules, and UI components. This data is saved in JSON schemas (`Adhar_verification.json` and `PAN_Verification.json`) which drive the dynamic frontend form rendering.

**Tools & Libraries:**  
- JavaScript: Puppeteer  
- Node.js environment  

**Implementation Highlights:**  
- Extracted all input fields: Aadhaar number, name, PAN, DOB, consent checkboxes, dropdowns, etc.  
- Captured validation rules: regex patterns for Aadhaar and PAN, required fields  
- Saved data in JSON format for frontend use  


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## 🚀 About Me
I'm a full stack developer...

