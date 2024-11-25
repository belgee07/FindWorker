"use client";

import React, { useState, useEffect } from "react";

type Job = {
  id: number;
  name: string;
  category: string;
};

const CategoryFilter = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = [
    "All",
    "Боловсрол",
    "Дизайн ба Урлаг",
    "Орчуулга",
    "IT Engineer",
    "Барилга Интерьер",
    "Гэр ахуй",
    "Гоо сайхан",
  ]; // Static category list for demonstration

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const data: Job[] = [
        { id: 1, name: "Software Engineer", category: "IT Engineer" },
        { id: 2, name: "Graphic Designer", category: "Design" },
        { id: 3, name: "Marketing Manager", category: "Marketing" },
        { id: 4, name: "Product Manager", category: "Tech" },
        { id: 5, name: "UI/UX Designer", category: "Design" },
      ];
      setJobs(data);
      setFilteredJobs(data); // Initially, show all jobs
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter jobs when the selected category changes
    if (selectedCategory === "All" || selectedCategory === "") {
      setFilteredJobs(jobs); // Show all jobs if "All" is selected
    } else {
      const filtered = jobs.filter((job) => job.category === selectedCategory);
      setFilteredJobs(filtered);
    }
  }, [selectedCategory, jobs]);

  return (
    <div className="p-4">
      {/* Category Selector */}
      <div className="flex gap-4 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="border p-4 mb-2 rounded shadow">
              <h3 className="text-lg font-bold">{job.name}</h3>
              <p className="text-gray-600">{job.category}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No jobs available in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
