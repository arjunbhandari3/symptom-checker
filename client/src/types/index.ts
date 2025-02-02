export interface PatientInfo {
  age: number;
  gender: 'male' | 'female' | 'other';
  symptoms: string;
}

export interface AnalysisResult {
  conditions: string[];
  recommendations: string[];
  urgencyLevel: "high" | "medium" | "low";
}


export interface ApiResponse {
  success: boolean;
  data: any;
  error?: string;
} 