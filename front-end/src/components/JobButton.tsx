"use client";

import { Button } from "./ui/button";

type JobButtonProps = {
  selectedType: string;
  onSelectType: (type: string) => void;
};

export const JobButton: React.FC<JobButtonProps> = ({
  selectedType,
  onSelectType,
}) => {
  const categories = [
    "Гэр ахуй",
    "Дизайн & Барилга",
    "Арт",
    "Гоо сайхан",
    "Орчуулга",
    "Боловсрол",
  ];

  return (
    <div className="flex justify-between mt-2 border-t-2 border-b-2 p-2">
      <Button
        variant="ghost"
        size="lg"
        className={` decoration-[2px] underline-offset-4 ${
          selectedType === "" ? "underline" : ""
        }`}
        onClick={() => onSelectType("")}
      >
        Бүгд
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant="ghost"
          size="lg"
          className={`hover:underline decoration-[2px] underline-offset-4 ${
            selectedType === category ? "underline" : ""
          }`}
          onClick={() => onSelectType(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
