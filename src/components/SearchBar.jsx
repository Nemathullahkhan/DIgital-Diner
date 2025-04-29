// // import { useState } from "react";
// // import { Search } from "lucide-react";

// // export default function SearchBar() {
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const handleSearch = async (e) => {
// //     e.preventDefault();
// //   };

// //   return (
// //     <form onSubmit={handleSearch} className="flex gap-2 mb-4">
// //       <div className="flex bg-black text-white rounded-2xl shadow-md px-4 w-full">
// //         <Search className="w-5 h-5 items-center mt-1.5 -ml-2 text-zinc-300"/>
// //         <input
// //           type="text"
// //           value={searchTerm}
// //           placeholder="Search for dishes..."
// //           className="rounded-md px-4 py-1 focus:outline-none w-full bg-transparent font-semibold  "
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           onKeyPress={(e) => {
// //             if (e.key === "Enter") {
// //               handleSearch(e);
// //             }
// //           }}
// //         />
// //       </div>
// //     </form>
// //   );
// // }

// import { useState } from "react";
// import { Search } from "lucide-react";

// export default function SearchBar({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch search results');
//       }
//       const data = await response.json();
//       onSearch(data); // Pass search results to parent component
//     } catch (error) {
//       console.error('Search error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="flex gap-2 mb-4">
//       <div className="flex bg-black text-white rounded-2xl shadow-md px-4 w-full">
//         <Search className="w-5 h-5 items-center mt-1.5 -ml-2 text-zinc-300"/>
//         <input
//           type="text"
//           value={searchTerm}
//           placeholder="Search for dishes..."
//           className="rounded-md px-4 py-1 focus:outline-none w-full bg-transparent font-semibold"
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === "Enter") {
//               handleSearch(e);
//             }
//           }}
//         />
//       </div>
//     </form>
//   );
// }

import { useState, useCallback } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Custom debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 300),
    [onSearch]
  );

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term); // Trigger debounced search
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Immediate search on submit
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <div className="flex bg-black text-white rounded-2xl shadow-md px-4 w-full">
        <Search className="w-5 h-5 items-center mt-1.5 -ml-2 text-zinc-300" />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search for dishes..."
          className="rounded-md px-4 py-1 focus:outline-none w-full bg-transparent font-semibold"
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
      </div>
    </form>
  );
}