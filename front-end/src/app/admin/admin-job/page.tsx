"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/components/Category";
import { CategoryList } from "@/components/CategoryList";
import { JobList } from "@/components/JobList";

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [options, setOptions] = useState<any[]>([]); // Store category options from backend
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState("");

  const [isTableVisible, setIsTableVisible] = useState(false);

  const handleSelectedItem = (value: string) => {
    setSelectedItem(value);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/categories/allCategory"
        );

        setOptions(data); // Assuming response data is an array of options
      } catch (err) {
        setError("Failed to load options");
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  // Function to handle opening the modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInputValue(""); // Optionally reset the input when closing
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:8000/api/jobs/addJob", {
      jobName: inputValue,
      categoryId: selectedItem,
    });

    handleClose();
  };
  console.log(selectedItem, "THIS IS SELECTED");

  const handleToggleTable = () => {
    setIsTableVisible((prev) => !prev);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <Button onClick={handleOpen} variant="secondary">
              Ажлын нэр үүсгэх
            </Button>
            <Button onClick={handleToggleTable} variant="secondary">
              {isTableVisible ? "Лист хаах" : "Лист харах"}
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {/* Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                {/* Hidden trigger to open modal */}
              </DialogTrigger>

              <DialogContent className="max-w-lg w-full">
                <DialogTitle>Ажлын нэр үүсгэх</DialogTitle>
                <DialogDescription>Шинэ ажлын нэр өгнө үү.</DialogDescription>

                {/* Card inside the modal with an input field */}
                <Card className="p-4 border rounded-lg shadow-md">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        id="input"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ажлын нэр"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Select onValueChange={handleSelectedItem}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a job" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {options.map((option, i) => {
                              return (
                                <SelectItem key={i} value={option._id}>
                                  {option.categoryName}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 m-4"
                        >
                          Хаах
                        </button>
                      </DialogClose>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-4"
                      >
                        Үүсгэх
                      </button>
                    </DialogFooter>
                  </form>
                </Card>
              </DialogContent>
            </Dialog>
          </div>

          {/* Modal */}
          {isTableVisible && <JobList />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
