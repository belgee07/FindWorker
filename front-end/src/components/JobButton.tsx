"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import axios from "axios";

type Category = {
  _id: string;
  categoryName: string;
};

type JobButtonProps = {
  selectedType: string;
  onSelectType: (type: string) => void;
};

export const JobButton: React.FC<JobButtonProps> = ({
  selectedType,
  onSelectType,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="text-center text-gray-600">Loading categories...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-between mt-2 border-t-2 border-b-2 p-2">
      <Button
        variant="ghost"
        size="lg"
        className={`decoration-[2px] underline-offset-4 ${
          selectedType === "" ? "underline" : ""
        }`}
        onClick={() => onSelectType("")}
      >
        Бүгд
      </Button>

      {categories.map((category) => (
        <Button
          key={category._id}
          variant="ghost"
          size="lg"
          className={`hover:underline decoration-[2px] underline-offset-4 ${
            selectedType === category.categoryName ? "underline" : ""
          }`}
          onClick={() => onSelectType(category.categoryName)}
        >
          {category.categoryName}
        </Button>
      ))}
    </div>
  );
};
