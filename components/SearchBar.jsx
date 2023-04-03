import { useState } from "react";
import Search from "../assets/Search";

export default function SearchBar({ onChange, placeholder }) {
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center bg-light p-3 rounded-lg px-4 w-1/4 border-neutral-800/80 border">
      <input
        type="text"
        className="outline-none placeholder-neutral-600 pr-4 w-full"
        placeholder={placeholder || "Search anything"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(value);
        }}
      />

      <Search className="stroke-neutral-500" />
    </div>
  );
}
