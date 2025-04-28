// 

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center justify-center mb-4">
      <div className="flex items-center bg-white rounded-md shadow-md p-2 w-full max-w-md">
        <Search className="text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search for dishes..."
          className="rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}