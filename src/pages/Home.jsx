// // import { useEffect, useState } from "react";
// // import { menuItemsData } from "../hooks/fetchData";
// // import {MenuItemCard} from "../components/DishCard";

// // export default function Home() {
// //   const [menuItems, setMenuItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const data = await menuItemsData(); // Await the async function
// //         setMenuItems(data); // Set the resolved data (array)
// //         console.log(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

// //   return (
// //     <>
// //       <div className="min-h-screen backdrop:blur-sm bg-stone-800 items-center p-4  text-zinc-300">
// //         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
// //           <div className="flex flex-col items-center justify-center">
// //             <div className="space-y-2">
// //               <h1 className="text-8xl font-bold tracking-tighter">The Digital Diner</h1>
// //               {menuItems.length > 0 ? (
// //                 menuItems.map((item) => (
// //                   <div key={item.id}>
// //                     <MenuItemCard {...item} />
// //                   </div>
// //                 ))
// //               ) : (
// //                 <p>No menu items available</p>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { menuItemsData } from "../hooks/fetchData";
// import MenuItemCard from "../components/DishCard";
// import SearchBar from "../components/SearchBar";

// export default function Home() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await menuItemsData();
//         setMenuItems(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen bg-stone-800">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="flex flex-col items-center justify-center h-screen bg-stone-800 text-zinc-300">
//       <div className="text-red-500 text-xl mb-4">Error loading menu: {error}</div>
//       <button 
//         onClick={() => window.location.reload()}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//       >
//         Retry
//       </button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-stone-800 p-4 text-zinc-300">
//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col items-center justify-center mb-8">
//           <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-center">
//             The Digital Diner
//           </h1>
//         </div>
//         <SearchBar/>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {menuItems.length > 0 ? (
//             menuItems.map((item) => (
//               <MenuItemCard key={item.id} {...item} />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-10">
//               <p className="text-xl">No menu items available</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { menuItemsData } from "../hooks/fetchData";
import MenuItemCard from "../components/DishCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Define categories based on backend schema
  const categories = [
    "All",
    "Appetizers",
    "Main Courses",
    "Desserts",
    "Drinks",
    "Breads",
    "Rice Dishes",
    "Side Dishes",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await menuItemsData();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter menu items based on selected category
  const filteredMenuItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-stone-800">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-stone-800 text-zinc-300">
      <div className="text-red-500 text-xl mb-4">Error loading menu: {error}</div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-800 p-4 text-zinc-300">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-center">
            The Digital Diner
          </h1>
        </div>

        <SearchBar />

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-stone-700 text-zinc-300 hover:bg-stone-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <MenuItemCard key={item._id} {...item} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl">No menu items available for {selectedCategory}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}