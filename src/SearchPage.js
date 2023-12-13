import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BandCard from "./BandCard";
import RecordCard from "./RecordCard";

function SearchPage(props){
    const {search} = useParams();
    const [bands, setBands] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getData(){
            const result = await props.search(search);
            console.log(result);
            setRecords(result.records);
            setBands(result.bands);
            setLoading(false);
        }
        getData();
    }, [search]);

    if(loading)return <h1>LOADING...</h1>
    return <div>
        <h2 className="flavor-text">Bands: </h2>
        <ul style={{display: "flex", flexWrap:"wrap"}}>
            {bands.map(b=>(<div className="info-div"><BandCard band={b}/></div>))}
        </ul>
        <h2 className="flavor-text">Records: </h2>
        <ul>
            {records.map(r=>(<div className="info-div"><RecordCard record={r}/></div>))}
        </ul>
    </div>
}

export default SearchPage;