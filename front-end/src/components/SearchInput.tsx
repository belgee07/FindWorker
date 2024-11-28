// "use client";
// import { useSearch } from "@/provider/SearchProvider";
// import Link from "next/link";
// type Worker = {
//     _id: string;
//     authId: string;
//     username: string;
//     profile_picture: string;
//     category: { _id: string; categoryName: string }[];
//     job: { _id: string; jobName: string }[];
//     bio: string;
//     phoneNumber: string;
//     address: string;
//     gender: string;
//     age: number;
//     salary_range: number;
//     experience: string;
//     email: string;
//     createdAt: string;
//     rating: number;
//   };

// export const SearchInput = ({ worker }: { worker: any[] }) => {
//     const { setSearchedData } = useSearch();
  
//     const searchHide = () => {
//       setSearchedData([]);
//     };
//     return (
//         <div>
//             <div>
//                 {worker?.map(({categoryName, jobName, authId }, index )=>{
//                     return(
//                         <Link 
//                         onClick={searchHide}
//                         key={index}
//                         href={`/profile/${worker.authId}`}
//                         >
//                         </Link>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }