import { ReactNode, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { DatePicker } from "./DatePicker";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast"; // Importing useToast

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
  const { toast } = useToast(); // Using the toast hook

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Та эхлээд нэвтэрнэ үү.</p>
          <Link href="/sign-in">
            <Button>Нэвтрэх</Button>
          </Link>

          <Button
            onClick={() => {
              onClose();
            }}
          >
            Гарах
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmitRequest = async () => {
    if (!requestText.trim()) {
      setError("Хүсэлт хоосон байж болохгүй.");
      return;
    }

    setLoading(true); // Start loading
    setError(null);
    try {
      // Имэйл илгээх
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/send-mail`,
        {
          authId: user.id,
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
          authId: user.id,
          workerId: workerId,
          status: "Pending",
          description: requestText,
          process: "Ongoing",
        }
      );

      // Show success toast
      toast({
        title: "Ажлын хүсэлт амжилттай илгээгдлээ!",
        description: "Таны хүсэлт амжилттай илгээгдсэн байна.",
      });
    } catch (error) {
      console.error("Алдаа гарлаа:", error);
      toast({
        title: "Алдаа гарлаа",
        description: "Ажлын хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
        variant: "destructive", // Show error toast
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 max-h-screen overflow-y-auto">
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
