import { useState } from "react";
import RecordCard from "./RecordCard";

function Home(props){
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useState(()=>{
        async function getData(){
            const records = await props.getRecords();
            console.log(records);
            setRecords(records);
            setLoading(false);
        }
        getData();
    },[])

    if(loading)return <h1>LOADING ....</h1>
    return <div className="grid-list">
        <div></div>
        <div className="grid-list">
            {records.map(r=>(<RecordCard record={r}/>))}
        </div>
        <div>
        </div>
    </div>
}

export default Home;