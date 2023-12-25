
//         <div className="relative">
//           <button
//             onClick={() => toggleDropdown(2)}
//             className="flex items-center"
//           >
//             Genres
//             {openDropdown === 2 ? (
//               <FaAngleUp className="ms-2.5" />
//             ) : (
//               <FaAngleDown className="ms-2.5" />
//             )}
//           </button>
//           {openDropdown === 2 && (
//             <div className="ml-6">
//               {genresLoading && <div>Loading...</div>}
//               {genresError && <div>Error loading genres.</div>}
//               {genres && (
//                 <div className="absolute absolute left-0 mt-3 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//                   <ul>
//                     {genres.map((genre) => (
//                       <li
//                         key={genre.id}
//                         className={`cursor-pointer ${
//                           selectedGenre === genre.id ? "font-bold" : ""
//                         }`}
//                         onClick={() => setSelectedGenre(genre.id)}
//                       >
//                         {genre.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="relative">
//           <button onClick={() => toggleDropdown(3)} className="flex items-center">
//             Production country
//             {openDropdown === 3 ? (
//               <FaAngleUp className="ms-2.5" />
//             ) : (
//               <FaAngleDown className="ms-2.5" />
//             )}
//           </button>
//           {openDropdown === 3 && (
//             <div className="absolute absolute left-0 mt-3 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//               <ul>
//                 {genres.map((genre) => (
//                   <li
//                     key={genre.id}
//                     className={`cursor-pointer ${
//                       selectedGenre === genre.id ? "font-bold" : ""
//                     }`}
//                     onClick={() => setSelectedGenre(genre.id)}
//                   >
//                     {genre.name}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <div>
//           <div onClick={() => toggleDropdown(4)} className="cursor-pointer">
//             Rating
//             {openDropdown === 4 ? (
//               <FaAngleUp className="ms-2.5" />
//             ) : (
//               <FaAngleDown className="ms-2.5" />
//             )}
//           </div>
//           {openDropdown === 4 && (
//             <div className="ml-6">Dropdown content for Genres</div>
//           )}
//         </div>

//         <div>
//           <div onClick={() => toggleDropdown(5)} className="cursor-pointer">
//             Runtime
//             {openDropdown === 5 ? (
//               <FaAngleUp className="ms-2.5" />
//             ) : (
//               <FaAngleDown className="ms-2.5" />
//             )}
//           </div>
//           {openDropdown === 5 && (
//             <div className="ml-6">Dropdown content for Genres</div>
//           )}
//         </div>
//       </section>

//     </div>
//   );
