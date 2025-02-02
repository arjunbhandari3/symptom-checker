import React from "react";
import { AnalysisResult } from "../types";

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

const Results: React.FC<Props> = ({ result, onReset }) => {
  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200 ring-red-500";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-500";
      case "low":
        return "bg-green-50 text-green-700 border-green-200 ring-green-500";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 ring-gray-500";
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="px-6 py-8 sm:p-10 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
          <button
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            New Analysis
          </button>
        </div>

        <div
          className={`inline-flex px-4 py-2 rounded-full ${getUrgencyColor(
            result?.urgencyLevel
          )} border ring-1 ring-opacity-50`}
        >
          <span className="font-medium capitalize flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full ${
                result?.urgencyLevel === "high"
                  ? "bg-red-500"
                  : result?.urgencyLevel === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            ></span>
            <span>{result?.urgencyLevel} Urgency Level</span>
          </span>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Possible Conditions
            </h3>
            <div className="space-y-3">
              {result?.conditions?.map((condition, index) => (
                <div
                  key={`${condition}-${index}`}
                  className="p-4 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {condition}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Recommendations
            </h3>
            <div className="space-y-3">
              {result?.recommendations?.map((recommendation, index) => (
                <div
                  key={`${recommendation}-${index}`}
                  className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  {recommendation}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
