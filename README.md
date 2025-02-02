# Symptom Checker

## Features
- Symptom analysis using AI and medical databases
- Real-time health recommendations
- Urgency level assessment
- Professional medical data integration

## Tech Stack

### Frontend :
- ReactJS
- TypeScript
- Tailwind CSS

### Backend
- NodeJS
- Express.js
- LangChain

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key
- ApiMedic credentials

## Installation

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/symptom-checker.git`
   cd symptom-checker
   ```

2. **Install Dependencies**
    ```
    npm install
    ```

    - Install client dependencies
    ```
    cd client && npm install
    ```

    - Install server dependencies**
    ```
    cd ../server && npm install
    ```

3. **Environment Setup**
    - Create `.env` file in the server directory:
    ```
    PORT=3001
    OPENAI_API_KEY=your_openai_api_key
    APIMEDIC_AUTH_URL=your_apimedic_auth_url
    APIMEDIC_HEALTH_URL=your_apimedic_health_url
    APIMEDIC_USERNAME=your_apimedic_username
    APIMEDIC_PASSWORD=your_apimedic_password
    ```

4. **Start the application**
    - From root directory
    ```
    npm run dev
    ```
