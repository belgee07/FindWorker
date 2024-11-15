"use client";

import { ReactNode, useState } from "react";
import { Button } from "./ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [zahialga, setZahialga] = useState(false);
  const [requestText, setRequestText] = useState(""); // Track textarea content

  if (!isOpen) return null;

  const handleZahialgaClick = () => {
    setZahialga(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-96">
        {children}
        <div className="flex gap-10">
          <textarea
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
            placeholder="Таны хүсэлт энд..."
            className="border-2 rounded-lg w-[340px] h-[200px]"
          ></textarea>
          <div className="w-[300px]">
            <strong>
              Захиалах товчийг дарснаар ажилтанд и-мэйл очих болно
            </strong>

            {zahialga && (
              <div className="mt-10">
                <div>Захиалга баталгаажлаа</div>
                <div className="bg-white p-4 rounded-lg w-[100px] h-[100px] relative">
                  <img
                    src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExamVjY2hqZzh5NjFxbjlvYWhlbnNsZDczNXdzOWllbW02bGNzbzNibyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KavG3AruG3gAXKkswv/giphy.gif"
                    alt="Checkout GIF"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <br />
        <div className="gap-4 flex">
          {/* Disable button when textarea is empty */}
          <Button onClick={handleZahialgaClick} disabled={!requestText.trim()}>
            Захиалах
          </Button>
          <Button onClick={onClose}>Гарах</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;