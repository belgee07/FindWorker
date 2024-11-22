"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryTable } from "./CategoryTable";
import { JobTable } from "./JobTable";

export type Job = {
  id: string;
  jobName: string;
  categoryId: string;
  createdAt: Date;
};

export function JobList() {
  //fetch category from back
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/jobs/getJobs"
        );

        setJobs(data); // Assuming response data is an array of options
      } catch (err) {
        setError("Failed to load options");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return <div>{jobs.length > 0 && <JobTable data={jobs} />}</div>;
}
