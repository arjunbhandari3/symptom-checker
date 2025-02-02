import { Request, Response } from 'express';
import { PatientInfo } from '../types';
import { analyzePatientSymptoms } from '../services/symptomService';

export const analyzeSymptoms = async (req: Request, res: Response) => {
  try {
    const patientInfo: PatientInfo = req.body;

    if (!patientInfo.age || !patientInfo.gender || !patientInfo.symptoms.length) {
      return res.status(400).json({ 
        error: 'Invalid input. Please provide age, gender, and at least one symptom.' 
      });
    }

    const response = await analyzePatientSymptoms(patientInfo);

    res.json(response);
  } catch (error) {
    console.error('Error checking symptoms:', error);
    res.status(500).json({ 
      error: true,
      message: 'Failed to analyze symptoms' 
    });
  }
};