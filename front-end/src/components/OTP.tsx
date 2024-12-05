"use client";

import OTPEmailIcon from "./OTPEmailIcon";

type OtpComponentsPropsType = {
    continueHandler: () => void;
};

export default function OTP({ continueHandler }: OtpComponentsPropsType) {
    return (
        <div>
            <div className="mt-105px flex items-center justify-center">
                <OTPEmailIcon className=" flex items-center justify-center mb-29px" />
                <div className="text-xl font-semibold mb-8px text-[#09090B]">Баталгаажуулах</div>
                <div className="font-normal text-sm mb-24px">" " хаягт илгээсэн баталгаажуулах кодыг оруулна уу</div>
            </div>
        </div>
    )
}