// SocialMediaCard.tsx
import React from "react";

interface SocialMediaCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
  secondaryValue: string;
  secondaryLabel: string;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({
  icon,
  value,
  label,
  bgColor,
  textColor,
  secondaryValue,
  secondaryLabel,
}) => {
  return (
    <div className="rounded-lg shadow-md">
      <div
        className={`text-5xl ${bgColor} ${textColor} p-6 flex flex-col items-center rounded-t-lg`}
      >
        {icon}
      </div>
      <div className="flex justify-between items-center w-full text-center p-6">
        <div className="text-lg font-semibold">
            <div className="text-gray-900">{value}</div>
            <div className="text-gray-500 text-base">{label}</div>
        </div>
        <div className="text-lg font-semibold">
            <div className="text-xl font-semibold text-gray-900">{secondaryValue}</div>
            <p className="text-gray-500 text-base">{secondaryLabel}</p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCard;
