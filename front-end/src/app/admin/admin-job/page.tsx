"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import React, { useState } from "react";

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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Function to handle opening the modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setIsOpen(false);
    setInputValue(""); // Optionally reset the input when closing
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Function to handle form submission (e.g., log input value)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted input:", inputValue);
    handleClose(); // Close the modal after submitting
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
            <Button variant="secondary">Лист харах</Button>
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
                      <Select>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Категори сонгох" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="next">Next.js</SelectItem>
                          <SelectItem value="sveltekit">SvelteKit</SelectItem>
                          <SelectItem value="astro">Astro</SelectItem>
                          <SelectItem value="nuxt">Nuxt.js</SelectItem>
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
                        type="submit"
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-4"
                      >
                        Үүсгэх
                      </button>
                    </DialogFooter>
                  </form>
                </Card>
              </DialogContent>
            </Dialog>

            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
