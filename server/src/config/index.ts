import dotenv from "dotenv";

dotenv.config();

export const config = {
    openai : {
        apiKey : process.env.OPENAI_API_KEY,
    },
    apiMedic : {
        authUrl : process.env.APIMEDIC_AUTH_URL,
        healthUrl : process.env.APIMEDIC_HEALTH_URL,
        username : process.env.APIMEDIC_USERNAME,
        password : process.env.APIMEDIC_PASSWORD,

    }
}   
