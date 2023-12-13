import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function GenrePage(props){
    const [records, setRecords] = useState([]);
    const [bands, setBands] = useState([]);
    const [name, setName] = useState();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(()=>{
        async function getData(){
            console.log(id);
            const res = await props.get(id);
            console.log(res);
            setBands(res.bands);
            setRecords(res.records);
            console.log(res.name);
            setName(res.name);
            setLoading(false);
        }
        getData();
    },[])

    if(loading) return <h1>LOADING...</h1>
    return <div>
        <h1>{name}</h1>
        <div>
            <h3>Records: </h3>
            <ul>
                {records.map(r=>(<li><NavLink to={`/records/${r.id}`}>{r.title}</NavLink></li>))}
            </ul>
        </div>
        <div>
            <h3>Bands: </h3>
            <ul>
                {bands.map(b=>(<li><NavLink to={`/bands/${b.id}`}>{b.name}</NavLink></li>))}
            </ul>
        </div>
    </div>
}

export default GenrePage;