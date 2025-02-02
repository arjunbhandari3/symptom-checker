import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

import { PatientInfo } from "../types";
import { config } from "../config";

const template = `
You are a medical assistant. Based on the following patient information and symptoms, provide possible conditions and recommendations.

Patient Information:
Age: {age}
Gender: {gender}

Symptoms:
{symptoms}

ApiMedic API Initial Analysis:
conditions: {conditions}
matchedSymptoms: {matchedSymptoms}

Please analyze the symptoms considering the patient's age, gender, symptom severity and duration. Provide:
1. Possible conditions
2. General recommendations
3. Urgency based on symptoms and duration and If the symptoms are severe, consider the possibility of a medical emergency and recommend immediate action.

Format your response as JSON with the following structure:
{{
  "conditions": ["condition1", "condition2"],
  "recommendations": ["recommendation1", "recommendation2"],
  "urgencyLevel": "high" | "medium" | "low"
}}`;

export const createSymptomChain = () => {
  const model = new ChatOpenAI({
    openAIApiKey: config.openai.apiKey,
    modelName: "gpt-4o-mini",
    temperature: 0.3,
  });

  const prompt = PromptTemplate.fromTemplate(template);
  const parser = new StringOutputParser();

  return prompt.pipe(model).pipe(parser);
};

export const performAnalysis = async (
  patientInfo: PatientInfo,
  apiDiagnosis: any
) => {
  const chain = createSymptomChain();

  const response = await chain.invoke({
    age: String(patientInfo.age),
    gender: patientInfo.gender,
    symptoms: patientInfo.symptoms,
    conditions: apiDiagnosis?.conditions?.join(', ') || 'No specific conditions found',
    matchedSymptoms: apiDiagnosis?.matchedSymptoms?.join(', ') || 'No specific symptoms found',
  });

  try {
    const cleanResponse = response.replace(/```json\n|\n```/g, "").trim();
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Failed to parse response:", response);
    throw new Error("Failed to parse AI response");
  }
};
