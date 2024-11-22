"use client";

import { useState, useEffect, useMemo } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Category[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/allCategory`
      );
      setCategories(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-600">Loading categories...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error}
        <Button variant="outline" size="sm" onClick={fetchCategories}>
          Retry
        </Button>
      </div>
    );
  }

  if (!loading && categories.length === 0) {
    return (
      <div className="text-center text-gray-500">No categories available</div>
    );
  }

  const renderedButtons = useMemo(
    () =>
      categories.map((category) => (
        <Button
          key={category._id}
          variant="ghost"
          size="lg"
          aria-pressed={selectedType === category.categoryName}
          className={`hover:underline decoration-[2px] underline-offset-4 ${
            selectedType === category.categoryName
              ? "font-bold text-blue-600"
              : ""
          }`}
          onClick={() => onSelectType(category.categoryName)}
        >
          {category.categoryName}
        </Button>
      )),
    [categories, selectedType]
  );

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-2 border-t-2 border-b-2 p-2">
      <Button
        variant="ghost"
        size="lg"
        className={`hover:underline ${
          selectedType === "" ? "font-bold text-blue-600" : ""
        }`}
        onClick={() => onSelectType("")}
      >
        Бүгд
      </Button>
      {renderedButtons}
    </div>
  );
};
