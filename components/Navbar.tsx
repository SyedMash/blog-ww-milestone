import React from "react";
import { Theme } from "./theme";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-16 container mx-auto px-2 lg:px-0 flex items-center justify-between">
      <Link href="/" className="text-xl md:text-3xl font-bold">
        WITTY<span className="text-red-400">WRITES</span>
      </Link>
      <Theme />
    </div>
  );
};

export default Navbar;
