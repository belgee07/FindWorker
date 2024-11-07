import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const WorkerData = () => {
  return (
    <div>
      <div className="flex flex-col w-[400px] h-[60px] ">
        <label htmlFor="Нэр">Нэр</label>
        <Input type="text" id="" placeholder="Нэр" />
      </div>
    </div>
  );
};
