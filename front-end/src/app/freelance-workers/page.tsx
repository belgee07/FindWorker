"use client";
import { useState } from "react";
import { SearchWorkers } from "@/components/SearchWorkers";

import { Search } from "@/components/Search";

const SearchWorkersPage = () => {
  // const [selectedType, setSelectedType] = useState<string>(""); // Default selected type

  // const handleSelectType = (type: string) => {
  //     setSelectedType(type);
  //     // Here you can also add additional logic to handle selection change if needed
  // };

  return (
    <div className="flex justify-center mt-10">
      <Search />
      {/* <SearchWorkers selectedType={selectedType} onSelectType={handleSelectType} /> */}
    </div>
  );
};

export default SearchWorkersPage;
