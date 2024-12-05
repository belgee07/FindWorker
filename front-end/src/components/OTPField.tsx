"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";

export default function OTPField({
    continueHandler,
}: {
    continueHandler: () => void;
}) {
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                const nextField = document.getElementById(
                    `otp-${index + 1}`
                ) as HTMLInputElement;
            }
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (!otp[index] && index > 0) {
                const prevField = document.getElementById(
                    `otp-${index - 1}`
                ) as HTMLInputElement;
                prevField?.focus();
                newOtp[index - 1] = "";
            } else {
                newOtp[index] = "";
            }
            setOtp(newOtp);
        }
    };
    return (
        <div>
            {otp.map((data, index) => (
                <div key={index} className="w-[56px] bg-white flex-col justify-start items-start gap-2 ">
                    <div onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
                        onMouseLeave={() => setHoveredIndex(-1)} // Reset hovered index
                        className={`self-stretch h-14 p-2 bg-white inline-flex justify-center items-center transition-all ${hoveredIndex === index ? "border-2 border-gray-900" : "border border-gray-300"
                            } ${index === 0
                                ? "rounded-l-lg"
                                : index === otp.length - 1
                                    ? "rounded-r-lg"
                                    : ""
                            }`}
                    >
                        <Input
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={otp[index]}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace key
                            onFocus={() => setHoveredIndex(index)} // Keep hovered index on focus
                            onBlur={() => setHoveredIndex(-1)} // Reset hovered index on blur
                            className="w-10 h-10 text-center text-[18px] font-inter font-normal leading-7 border-none outline-none relative z-10"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}