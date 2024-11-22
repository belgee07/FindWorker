"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { CategoryTable } from "./CategoryTable";

export type Category = {
  id: string;
  categoryName: string;
  createdAt: Date;
};

export function CategoryList() {
  //fetch category from back
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/categories/allCategory"
        );

        setCategories(data);
      } catch (err) {
        setError("Failed to load options");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>{categories.length > 0 && <CategoryTable data={categories} />}</div>
  );
}
