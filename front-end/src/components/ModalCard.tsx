"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModalCardProps {
  isOpen: boolean;
  onClose: () => void;
  authId: string | undefined
}

const ModalCard: React.FC<ModalCardProps> = ({ isOpen, onClose, authId }) => {

  if (!isOpen) return null;

  const [inputValue, setInputValue] = useState({
    bank: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const handleBankChange = (value: string) => {
    setInputValue((prev) => ({ ...prev, bank: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };
  const validateInputs = () => {
    const { cardNumber, expiryDate, cvv } = inputValue;

    if (!/^\d{16}$/.test(cardNumber)) {
      toast({
        title: "Invalid Card Number",
        description: "Card number must be 16 digits.",
       
      });
      return false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      toast({
        title: "Invalid Expiry Date",
        description: "Use format MM/YY.",
        
      });
      return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
      toast({
        title: "Invalid CVV",
        description: "CVV must be 3 digits.",
       
      });
      return false;
    }

    return true;
  };
  const AddBankData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { bank, cardNumber, cardHolder, expiryDate, cvv } = inputValue;
  
    if (!bank || !cardNumber || !cardHolder || !expiryDate || !cvv) {
      toast({
        title: "All fields are required",
        description: "Please fill in all the fields.",
      
      });
      return;
    }
    
    if (!validateInputs()) return;
    try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cards`,
          {
            bank, cardNumber, cardHolder, expiryDate, cvv, authId: authId
          }
        );
     
      toast({
        title: "Success",
        description: "Card data added successfully.",
      });
      onClose();

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add card data.",
     
      });
      console.error("Error adding bank data:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[450px] p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <div className="flex justify-center items-center gap-3 mb-6 text-lg font-semibold">
          Карт нэмэх
        </div>
        <div className="flex flex-col gap-4">
          <Select
            name="bank"
            value={inputValue.bank}
            onValueChange={handleBankChange}
          >
           <SelectTrigger className={`w-full ${!inputValue.bank && 'border-red-500'}`}>
            <SelectValue placeholder="Банк сонгох" />
             </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="tdb">
                  <div className="flex items-center gap-2">
                    <img src="/tdb.png" alt="TDB Bank" className="w-5 h-5" />
               
                  </div>
                </SelectItem>
                <SelectItem value="khaan">
                  <div className="flex items-center gap-2">
                    <img
                      src="/khaan.png"
                      alt="Khaan Bank"
                      className="w-5 h-5"
                    />
               
                  </div>
                </SelectItem>
                <SelectItem value="xas">
                  <div className="flex items-center gap-2">
                    <img src="/xas.png" alt="Xac Bank" className="w-5 h-5" />
               
                  </div>
                </SelectItem>
                <SelectItem value="mbank">
                  <div className="flex items-center gap-2">
                    <img
                      src="/mbank.png"
                      alt="M Bank"
                      className="w-5 h-5"
                    />
                  
                  </div>
                </SelectItem>
                <SelectItem value="state">
                  <div className="flex items-center gap-2">
                    <img
                      src="/state.png"
                      alt="State Bank"
                      className="w-5 h-5"
                    />
                
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-slate-500 text-sm mb-1"
            >
              Картын дугаар*
            </label>
            <Input
              id="cardNumber"
              name="cardNumber"
              type="text"
              placeholder="4200 0000 0000 0000"
              value={inputValue.cardNumber}
              onChange={handleInputChange}
              className="w-full h-[50px] rounded-md px-3 font-medium"
            />
          </div>
          <div>
            <label
              htmlFor="cardHolder"
              className="block text-slate-500 text-sm mb-1"
            >
              Карт эзэмшигчийн нэр*
            </label>
            <Input
              id="cardHolder"
              name="cardHolder"
              type="text"
              placeholder="Erdene"
              value={inputValue.cardHolder}
              onChange={handleInputChange}
              className="w-full h-[50px] rounded-md px-3 font-medium"
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="expiryDate"
                className="block text-slate-500 text-sm mb-1"
              >
                Хүчинтэй хугацаа*
              </label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder="11/28"
                value={inputValue.expiryDate}
                onChange={handleInputChange}
                className="w-full h-[50px] rounded-md px-3 font-medium"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="cvv"
                className="block text-slate-500 text-sm mb-1"
              >
                CVV*
              </label>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                placeholder="***"
                value={inputValue.cvv}
                onChange={handleInputChange}
                className="w-full h-[50px] rounded-md px-3 font-medium"
              />
            </div>
          </div>
          <Button onClick={AddBankData} className="w-full bg-blue-600 text-white py-2 rounded-md">
            Хадгалах
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;



