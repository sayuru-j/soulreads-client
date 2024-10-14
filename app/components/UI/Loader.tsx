"use client";

import React from "react";
import { ImSpinner5 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <ImSpinner5 className="w-8 h-8 animate-spin" />
    </div>
  );
};

export default Loader;
