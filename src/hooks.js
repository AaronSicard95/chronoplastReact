import { useState } from "react";
import ChronoApi from "./api";
import { type } from "@testing-library/user-event/dist/type";

const useApi=()=>{
    const [data, setData] = useState({});

    const getData=async(types=[])=>{
        let newData = {};
        if(types.includes("bands")){
            const bands = await ChronoApi.getBands();
            newData={...newData, bands};
        }
        if(types.includes("records")){
            const records = await ChronoApi.getRecords();
            newData={...newData, records};
        }
        if(type.includes("listings")){
            //listings
        }
    }

    const postData=async(type="", data)=>{
        let res = {};
        if(type==="band"){
            const newBand = await ChronoApi.makeBand(data);
            return newBand;
        }else if(type==="record"){
            const newRecord = await ChronoApi.makeRecord(data);
            return newRecord;
        }
    }
} 