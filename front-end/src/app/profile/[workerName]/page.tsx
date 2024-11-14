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
    age: "21",
    experience: "10",
    gender: "Male",
    salary: "1hr/15$",
    phoneNumber: "99119911",
    email: "ajiltan7711@gmail.com",
  };

  return (
    <div className="flex justify-center mt-14">
      <div className="  w-[1220px]  ">
        <div className="border-2 flex gap-4 items-center p-8">
          <img src={worker.avatar} className="w-22 h-20 rounded-full" />
          <div>
            <strong>{workerName}</strong>
            <address>Addresss:{worker.address}</address>
          </div>
        </div>

        <div className="flex">
          <div className="flex-col border-x-2 w-[399px] border-b-2 p-8">
            <div>Type : {worker.type}</div>
            <div>Experience : {worker.experience}</div>
            <div>Age : {worker.age}</div>
            <div>Gender : {worker.gender}</div>
            <div>Salary : {worker.salary}</div>
            <div>
              <strong>Холбоо барих : </strong>
              <div>Утас : {worker.phoneNumber}</div>
              <div>Email : {worker.email}</div>
            </div>
          </div>
          <div>dosan</div>
        </div>
      </div>
    </div>
  );
};

export default page;
