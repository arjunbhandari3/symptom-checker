import { performAnalysis } from "../chains/symptomChain";
import { PatientInfo } from "../types";
import { getDiagnosis } from "./medicalService";

export const analyzePatientSymptoms = async (patientInfo: PatientInfo) => {
  try {
    // Get medical API response
    const apiDiagnosis = await getDiagnosis(patientInfo);

    // Get AI analysis
    const aiAnalysis = await performAnalysis(patientInfo, apiDiagnosis);

    return {
      error: false,
      data: aiAnalysis,
    };
  } catch (error) {
    console.error("Error checking symptoms:", error);
    throw new Error("Failed to process symptoms");
  }
};
