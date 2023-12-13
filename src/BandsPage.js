import { useState, useEffect } from"react";
import BandCard from"./BandCard";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function BandsPage(props){
    const admin = useSelector(store=>store.admin);
    const [bands, setBands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getBands(){
            let bands = await props.get();
            console.log(bands);
            setBands(bands);
            setLoading(false);
        }
        getBands();
    },[]);

    if(loading) return <h1>LOADING...</h1>
    return <div>
        <div style={{display: "flex", justifyContent:"space-between"}}>
            <h1 className="flavor-text">BANDS: </h1>
            {admin?<NavLink to='/bands/add'><button>Add</button></NavLink>:""}
        </div>
        <div style={{display: "flex", flexWrap:"wrap", justifyContent:"space-between"}}>
        {bands.map(b=><div className="info-div" style={{borderStyle:"solid", borderWidth:"5px",borderColor:"red", maxWidth:"30%", width:"30%", height: "30%"}}>
            <BandCard band={b}/>
            </div>)}
        </div>
    </div>
}

export default BandsPage;