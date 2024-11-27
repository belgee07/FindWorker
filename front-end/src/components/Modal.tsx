import { ReactNode, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { DatePicker } from "./DatePicker";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [zahialga, setZahialga] = useState(false);
  const [requestText, setRequestText] = useState(""); // Track textarea content
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null); // For error handling

  if (!isOpen) return null;

  const handleZahialgaClick = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send-request`,
        {
          to: "worker@example.com", // Replace with dynamic email
          subject: "Ажил гүйцэтгэх хүсэлт",
          text: requestText,
        }
      );

      setZahialga(true);
    } catch (err) {
      console.error(err);
      setError("Имэйл явуулахад алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] h-[500px] ml-6">
        {children}
        <div className="flex flex-col gap-4 ml-16">
          <div>
            <p>Ажил гүйцэтгэх хугацаа</p>
            <DatePicker />
          </div>
          <div className="flex flex-col gap-4">
            <textarea
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="Таны хүсэлт энд..."
              className="border-2 rounded-lg w-[600px] h-[200px] pl-4"
            ></textarea>
            {error && <p className="text-red-500">{error}</p>}
            {zahialga && (
              <div className="mt-10">
                <div>Захиалга баталгаажлаа</div>
              </div>
            )}
          </div>
        </div>
        <div className="gap-4 flex ml-[490px] mt-6">
          <Button
            onClick={handleZahialgaClick}
            disabled={!requestText.trim() || loading}
          >
            {loading ? "Илгээж байна..." : "Захиалах"}
          </Button>
          <Button onClick={onClose}>Гарах</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
