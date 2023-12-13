import { useEffect, useState } from "react";
import RecordCard from "./RecordCard";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './recordStyle.css';

function Records(props){
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const admin = useSelector(store => store.admin);
    console.log(admin);

    useEffect(()=>{
        async function getData(){
            const recordResults = await props.getRecords();
            console.log(recordResults);
            setRecords(Object.keys(recordResults).length==0?[]:recordResults);
            setLoading(false);
        }
        getData();
    }, [])

    if(loading){
        return <h1>Loading</h1>
    }
    return <div>
        <div style={{display: "flex", justifyContent:"space-between"}}>
        <h1 className="flavor-text">Records</h1>
        {admin?<NavLink to="/records/add"><button>Add Record</button></NavLink>:""}
        </div>
        <div className="grid-list">
        {records.map(r=>(<div className="info-div" style={{maxWidth:"30%", minWidth:"30%", marginBottom:"5%", borderStyle:"solid", borderRadius:"5px", borderColor:"black"}}>
            <RecordCard order={props.order} record={r}/>
            </div>))}
        </div>
    </div>
}

export default Records;