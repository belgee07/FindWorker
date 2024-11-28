"use client";
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "./ui/input";
import { IoSearch } from "react-icons/io5";
import axios from 'axios';

type Category = {
    _id: string;
    categoryName: string;
};

type SearchWorkersProps = {
    selectedType: string;
    onSelectType: (type: string) => void;
};

export function SearchWorkers({ selectedType, onSelectType }: SearchWorkersProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/allCategory`
                );
                setCategories(response.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch categories");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(category =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="mt-12 ml-12">
            <div className="text-lg font-semibold">Ажлын төрлүүд</div>
            <div className="flex flex-row gap-[150px]">
                <div className="mt-2">
                    <RadioGroup
                        value={selectedType}
                        onValueChange={onSelectType}
                        className="flex flex-col gap-4"
                    >
                        {filteredCategories.map((category) => (
                            <div className="flex items-center space-x-2" key={category._id}>
                                <RadioGroupItem value={category.categoryName} id={category._id} />
                                <Label
                                    htmlFor={category._id}
                                    className={`decoration-[2px] underline-offset-4 ${
                                        selectedType === category.categoryName ? "underline" : ""
                                    }`}
                                >
                                    {category.categoryName}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                <div className="relative">
                    <Input
                        className="rounded-xl pl-12 text-sm w-[400px]"
                        type="text"
                        placeholder="Хайх ажил"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IoSearch className="absolute left-2 top-2/4 transform -translate-y-1/2 w-[20px] h-[20px]" />
                </div>
            </div>
        </div>
    );
}