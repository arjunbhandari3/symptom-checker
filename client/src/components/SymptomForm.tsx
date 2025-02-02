import React, { useState } from "react";
import { PatientInfo } from "../types";
import toast from "react-hot-toast";

interface Props {
  onSubmit: (data: PatientInfo) => void;
  isLoading: boolean;
}

const SymptomForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    age: 0,
    gender: "male",
    symptoms: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientInfo.age <= 0) {
      toast.error("Please enter a valid age");
      return;
    }
    if (!patientInfo.symptoms.trim()) {
      toast.error("Please describe your symptoms");
      return;
    }
    onSubmit(patientInfo);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Health Symptom Checker
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Age
              </label>
              <input
                id="age"
                type="number"
                min="0"
                max="120"
                value={patientInfo.age || ""}
                onChange={(e) =>
                  setPatientInfo((prev) => ({
                    ...prev,
                    age: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter age"
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                value={patientInfo.gender}
                onChange={(e) =>
                  setPatientInfo((prev) => ({
                    ...prev,
                    gender: e.target.value as "male" | "female" | "other",
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="symptoms"
              className="block text-sm font-medium text-gray-700"
            >
              Describe Your Symptoms
            </label>
            <textarea
              id="symptoms"
              value={patientInfo.symptoms}
              onChange={(e) =>
                setPatientInfo((prev) => ({
                  ...prev,
                  symptoms: e.target.value,
                }))
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Please describe your symptoms in detail (e.g., severe headache with nausea for the past 2 days)"
            />
            <p className="text-sm text-gray-500">
              Be as specific as possible about your symptoms, their severity,
              and duration.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                   hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out
                   flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Analyze Symptoms</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;
