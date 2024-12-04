"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

interface ModalPaymentProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    authId: string | undefined
}


const BANKS = [
    {
        name: 'tdb',
        image: '/tdb.png'
    },
    {
        name: 'xas',
        image: '/xas.png'
    },
    {
        name: 'state',
        image: '/state.png'
    },
    {
        name: 'mbank',
        image: '/mbank.png'
    },
    {
        name: 'khaan',
        image: '/khaan.png'
    }
]

const ModalPayment: React.FC<ModalPaymentProps> = ({ onClose, authId }) => {
    const [card, setCard] = useState<Record<string, string>>();


    useEffect(() => {
        const getCard = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/card/${authId}`)
            console.log(data);

            setCard(data)
        }

        getCard()
    }, [])


    const checkbutton = () => {
        console.log(checkbutton);

        toast.success("Төлбөр амжилттай төлөгдлөө")


    }



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" >
            <div className="w-[550px] flex flex-col gap-8 justify-center items-center border  bg-white p-6 rounded-lg "  >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
                <p>Эрх сунгах үйлчилгээг баталгаажуулах</p>
                <div className="flex flex-row gap-4 w-[350px] justify-center h-12 items-center bg-blue h-15  border ">
                    <div> {
                        BANKS.map((el, index) => {
                            if (el.name == card?.bank as string) {
                                return <img key={index} src={el.image} width={24} height={24} />
                            }
                        })
                    } </div>
                    <div> {card?.cardNumber} </div>
                    <div> {card?.expiryDate} </div>
                </div>
                <div className="flex flex-row gap-4">
                    <Button onClick={onClose} className=" bg-slate-600 "
                    >Болих</Button>
                    <Button onClick={checkbutton}>Төлбөр төлөх</Button>
                </div>
            </div>
            <ToastContainer />

        </div>

    )
}
export default ModalPayment