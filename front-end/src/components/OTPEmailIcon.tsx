"use client";

interface OTPEmailIconProps {
  className?: string; // Class for additional Tailwind styling
}

export default function OTPEmailIcon({ className }: OTPEmailIconProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg
        width="86"
        height="86"
        viewBox="0 0 86 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20"
      >
        <path d="M0.129883 85.4987V34.9676L8 29.501H79L85.8698 34.9676V85.4987H0.129883Z" fill="#7C9CE8" />
        <rect x="7.5" y="0.501953" width="72" height="76" fill="white" />
        <path d="M85.8698 85.4979H0.129883L85.8698 34.9668V85.4979Z" fill="#CBD6F0" />
        <path d="M0.129883 85.4979V34.9668L85.8698 85.4979H0.129883Z" fill="#E3E8F3" />
      </svg>
    </div>
  );
}
