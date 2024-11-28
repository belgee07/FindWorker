"use client";

import { WorkerModelType } from "@/components/EditWorkerData";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext,  useState, FC,   } from "react";

export type HiredWorkersType ={
    _id: string;
    authId: string;
    username: string;
    profile_picture: string;
    category: { _id: string; categoryName: string }[];
    bio: string;
    job: { _id: string; jobName: string }[];
    phoneNumber: string;
    address: string;
    gender: string;
    age: number;
    education: string;
    languages: string[];
    salary_range: number;
    experience: string;
    email: string;
    createdAt: string;
    rating: number;
    skills: string;
};
interface WorkerContentType{
    setWorkerData: Dispatch<SetStateAction<WorkerModelType[]>>;
    workerData:WorkerModelType[];
    savedWorkers:WorkerModelType[];
    setSavedWorkers:Dispatch<SetStateAction<WorkerModelType[]>>;
    searchedData:WorkerModelType[];
    setSearchedData:Dispatch<SetStateAction<WorkerModelType[]>>;
    hiredWorkers:WorkerModelType[];
    setHiredWorkers:Dispatch<SetStateAction<WorkerModelType[]>>;
};
export const SearchContext = createContext<WorkerContentType | undefined>(
    undefined
);
interface SearchProviderProps {
    children:ReactNode;
}

export const SearchProvider:FC<SearchProviderProps> = ({children})=>{
    const [workerData, setWorkerData] = useState<WorkerModelType[]>([]);
    const [savedWorkers, setSavedWorkers] = useState<WorkerModelType[]>([]);
    const [hiredWorkers, setHiredWorkers]= useState<WorkerModelType[]>([]);
    const [searchedData, setSearchedData] =  useState<WorkerModelType[]>([]);
    return (
       <SearchContext.Provider
       value={{
        workerData,
        setWorkerData,
        savedWorkers,
        setSavedWorkers,
        searchedData,
        setSearchedData,
        hiredWorkers,
        setHiredWorkers,
       }}>{children}</SearchContext.Provider>
    );
};
export const useSearch = ():WorkerContentType =>{
    const search = useContext(SearchContext);

    if (!search) {
        throw new Error ("Search must be failed");
    }
return search;
};