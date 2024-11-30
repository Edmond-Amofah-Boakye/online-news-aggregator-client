// GeneralStatCard.tsx
import React from "react";

interface GeneralStatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const GeneralStatCard: React.FC<GeneralStatCardProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center space-y-2">
      <div className="text-4xl text-blue-500">{icon}</div>
      <div className="text-3xl font-semibold">{value}</div>
      <p className="text-gray-500">{label}</p>
    </div>
  );
};

export default GeneralStatCard;
