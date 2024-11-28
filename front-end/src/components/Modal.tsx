import { ReactNode, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { DatePicker } from "./DatePicker";
import { useUser } from "@clerk/nextjs";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerId: string;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  workerId,
  children,
}) => {
  const [zahialga, setZahialga] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  // if (!user) {
  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  //       <div className="bg-white p-6 rounded-lg shadow-lg">
  //         <p>Та эхлээд нэвтэрнэ үү.</p>
  //         <Button
  //           onClick={() => {
  //             onClose();
  //           }}
  //         >
  //           Гарах
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  if (!isOpen) return null;

  const handleSubmitRequest = async () => {
    if (!requestText.trim()) {
      setError("Хүсэлт хоосон байж болохгүй.");
      return;
    }
    try {
      // Имэйл илгээх
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/send-mail`,
        {
          clientId: "673ff6761daa3322437c9712",
          workerId: workerId,
          status: "Pending",
          description: requestText,
          process: "Ongoing",
        }
      );

      // Өгөгдөл хадгалах
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/create`,
        {
          clientId: "673ff6761daa3322437c9712",
          workerId: workerId,
          status: "Pending",
          description: requestText,
          process: "Ongoing",
        }
      );

      alert("Ажлын хүсэлт амжилттай илгээгдлээ!");
    } catch (error) {
      console.error("Алдаа гарлаа:", error);
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
            onClick={handleSubmitRequest}
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
