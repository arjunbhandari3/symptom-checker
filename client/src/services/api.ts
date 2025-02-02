import axios from 'axios';
import { PatientInfo, AnalysisResult } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;;

export const checkSymptoms = async (patientInfo: PatientInfo): Promise<AnalysisResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze-symptoms`, { ...patientInfo });
    
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to check symptoms');
  }

};