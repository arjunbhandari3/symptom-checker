export interface PatientInfo {
  age: number;
  gender: string;
  symptoms: string;
}

export interface SymptomCheckResult {
  conditions: string[];
  recommendations: string[];
  urgencyLevel: "high" | "medium" | "low"; 
}

export interface ApiMedicSymptom {
  ID: number;
  Name: string;
}

export interface ApiMedicDiagnosis {
  Issue: {
    Name: string;
    Accuracy: number;
  };
}
