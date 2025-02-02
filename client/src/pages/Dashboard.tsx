import React, { useState } from "react";
import { checkSymptoms } from "../services/api";
import { PatientInfo, AnalysisResult } from "../types";
import Results from "../components/Results";
import SymptomForm from "../components/SymptomForm";
import toast from "react-hot-toast";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (patientInfo: PatientInfo) => {
    setLoading(true);
    try {
      const result = await checkSymptoms(patientInfo);
      setResult(result);
    } catch (err) {
      toast.error("Failed to analyze symptoms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      {result ? (
        <Results result={result} onReset={handleReset} />
      ) : (
        <SymptomForm onSubmit={handleSubmit} isLoading={loading} />
      )}
    </div>
  );
};

export default Dashboard;
