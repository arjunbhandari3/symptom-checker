import { Router } from 'express';
import { analyzeSymptoms } from '../controllers/symptomController';

const router = Router();

router.post('/analyze-symptoms', analyzeSymptoms);

export default router; 