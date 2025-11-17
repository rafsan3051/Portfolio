"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface ProjectSearchProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const categories = [
  "All",
  "JavaScript",
  "TypeScript",
  "Python",
  "PHP",
  "Java",
  "Other",
];

export default function ProjectSearch({
  onSearch,
  onCategoryChange,
  selectedCategory,
}: ProjectSearchProps) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="mb-12 space-y-6 animate-fade-in">
      {/* Search Bar */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search projects by name or description..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 py-3 pl-12 pr-12 text-zinc-100 placeholder-zinc-500 backdrop-blur-sm transition-all duration-300 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "border-zinc-500 bg-zinc-700/50 text-zinc-100"
                : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-700/50 hover:text-zinc-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
