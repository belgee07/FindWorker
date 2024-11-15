"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JobButton } from "./JobButton";
import Link from "next/link";

type Worker = {
  name: string;
  type: string;
  date: string;
  description: string;
  phone: string;
  address: string;
  avatar: string;
};

const workersData: Worker[] = [
  {
    name: "ProfileName1",
    type: "Гэр ахуй",
    date: "2024-11-12 14:41",
    description:
      "bair, oron suuts geed tsewerlehgui ym baihgui soliotoi tsewerlne",
    phone: "99119911",
    address: "Mangasiin am",
    avatar: "https://github.com/shadcn.png",
  },
  {
    name: "ProfileName2",
    type: "Дизайн & Барилга",
    date: "2024-11-12 14:41",
    description:
      "bair, oron suuts geed tsewerlehgui ym baihgui soliotoi tsewerlne",
    phone: "99119911",
    address: "Mangasiin am",
    avatar: "https://github.com/username2.png",
  },
  {
    name: "ProfileName3",
    type: "Арт",
    date: "2024-11-12 14:41",
    description:
      "bair, oron suuts geed tsewerlehgui ym baihgui soliotoi tsewerlne",
    phone: "99119911",
    address: "Mangasiin am",
    avatar: "https://github.com/username3.png",
  },
  {
    name: "ProfileName4",
    type: "Гоо сайхан",
    date: "2024-11-12 14:41",
    description:
      "bair, oron suuts geed tsewerlehgui ym baihgui soliotoi tsewerlne",
    phone: "99119911",
    address: "Mangasiin am",
    avatar: "https://github.com/username4.png",
  },
  {
    name: "ProfileName5",
    type: "Орчуулга",
    date: "2024-11-12 14:41",
    description:
      "bair, oron suuts geed tsewerlehgui ym baihgui soliotoi tsewerlne",
    phone: "99119911",
    address: "Mangasiin am",
    avatar: "https://github.com/username5.png",
  },
  {
    name: "ProfileName6",
    type: "Боловсрол",
    date: "2024-11-12 14:41",
    description:
      "bair, oron suuts geed tsewerlehgui ym baihgui soliotoi tsewerlne",
    phone: "99119911",
    address: "Mangasiin am",
    avatar: "https://github.com/username6.png",
  },
];

export const Workers: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("");

  const filteredWorkers = selectedType
    ? workersData.filter((worker) => worker.type === selectedType)
    : workersData;

  return (
    <div>
      <JobButton selectedType={selectedType} onSelectType={setSelectedType} />

      <div className="grid grid-cols-3 gap-10">
        {filteredWorkers.map((worker, index) => (
          <Link
            key={index}
            href={`/profile/${encodeURIComponent(worker.name)}`}
          >
            <div className="w-[400px] mt-4 rounded-lg p-4 shadow-2xl">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={worker.avatar} />
                  <AvatarFallback>
                    {worker.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div>Ажилтан : {worker.name}</div>
                  <div>Төрөл : {worker.type}</div>
                  <div>{worker.date}</div>
                </div>
              </div>
              <div>{worker.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
