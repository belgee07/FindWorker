"use client";
import React from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select"; // import necessary components

const options = [
  "Боловсрол",
  "Дизайн ба Урлаг",
  "Орчуулга",
  "Гэр ахуй",
  "Гоо сайхан ",
  "Барилга, Интерьер",
];

const WorkerCategory = () => {
  const [value, setValue] = React.useState<string | null>(options[0]);

  return (
    <div>
      <h1> Ерөнхий ангилал</h1>
      <div className="mt-2">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[525px] h-[56px]">
            <SelectValue placeholder="Сонгох" />
          </SelectTrigger>

          {/* Wrap SelectItem components inside SelectContent */}
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default WorkerCategory;
