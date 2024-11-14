import React from "react";
import { JobButton } from "./JobButton";
import { Workers } from "./Workers";

export const HomePage = () => {
  return (
    <div>
      <div>
        <img className="mt-2" src="./banner.png" alt="" />
      </div>

      <div>
        <Workers />
      </div>
    </div>
  );
};
