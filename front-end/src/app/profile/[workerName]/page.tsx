"use client";

import { useParams, useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { workerName } = useParams();

  const worker = {
    name: "ProfileName1",
    type: "Гэр ахуй",
    date: "2024-11-12 14:41",
    description:
      "bair, oron suuts geed tsewerlehgui ym baihgui soliotoi tsewerlne",
    phone: "99119911",
    address: "Mangasiin am",
    avatar: "https://github.com/shadcn.png",
  };

  return (
    <div className="flex  justify-center mt-14">
      <div className="flex gap-3 border-2 w-[1120px]">
        <img
          src={worker.avatar}
          alt={`${workerName}'s avatar`}
          className="w-10 h-10 rounded-2xl"
        />
        <div className="flex-col">
          <h1>
            <strong>Profile of {workerName}</strong>
          </h1>
          <div>Address: {worker.address}</div>
          <div className="flex-col border-t-2">
            <strong>
              <h2>Hours per week</h2>
            </strong>
            <strong>More than 30hrs/week</strong>
            <div>
              <strong>
                <h3>Languages</h3>
              </strong>
              <strong>English:hi,bye uur ug obso</strong>
            </div>
            <div>
              <strong>
                <h3>Education:</h3>
              </strong>
              baiiihguieee baihguie
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
