import axios from "axios";
import crypto from "crypto";
import { ApiMedicDiagnosis, ApiMedicSymptom, PatientInfo } from "../types";
import { config } from "../config";

export const getDiagnosis = async (patientInfo: PatientInfo) => {
  try {
    const authToken = await getAuthToken();

    const symptoms = await axios.get(`${config.apiMedic.healthUrl}/symptoms`, {
      params: {
        token: authToken,
        language: "en-gb",
        format: "json",
      },
    });

    const matchedSymptoms = symptoms.data.filter((symptom: ApiMedicSymptom) =>
      patientInfo.symptoms.toLowerCase().includes(symptom.Name.toLowerCase())
    );

    if (matchedSymptoms.length === 0) {
      return { conditions: [], matchedSymptoms: [] };
    }

    const diagnosis = await axios.get(
      `${config.apiMedic.healthUrl}/diagnosis`,
      {
        params: {
          symptoms: JSON.stringify(
            matchedSymptoms.map((s: ApiMedicSymptom) => s.ID)
          ),
          gender: patientInfo.gender,
          year_of_birth: new Date().getFullYear() - patientInfo.age,
          token: authToken,
          language: "en-gb",
          format: "json",
        },
      }
    );

    const conditions = diagnosis.data.map((d: ApiMedicDiagnosis) => ({
      name: d.Issue.Name,
      accuracy: d.Issue.Accuracy
    }));

    return {
      conditions,
      matchedSymptoms: matchedSymptoms.map((s: ApiMedicSymptom) => s.Name),
    };
  } catch (error) {
    console.error("Error:", error);
    return { conditions: [], matchedSymptoms: [] };
  }
};

const getAuthToken = async () => {
  try { 
    const computedHash = crypto
      .createHmac("md5", config.apiMedic.password ?? "")
      .update(`${config.apiMedic.authUrl}/login`)
      .digest("base64");

    const response = await axios.post(
      `${config.apiMedic.authUrl}/login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${config.apiMedic.username}:${computedHash}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.Token;
  } catch (error: any) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};



