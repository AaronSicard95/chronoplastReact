import { useState, useEffect } from"react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from"react-router-dom";

function BandPage(props){
    const admin = useSelector(store=>store.admin);
    const {id} = useParams(props);
    const [band, setBand] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getBand(){
            const bandRes = await props.get(id);
            console.log(bandRes);
            setBand(bandRes);
            setLoading(false);
        }
        getBand()
    },[])

    if(loading)return <h1>LOADING...</h1>
    return <div className="info-div">
        <div style={{display: "flex", justifyContent:"space-between"}}>
            <img src={`${band.imageurl}`} alt="No Image"/>
            <h1 className="flavor-text" style={{height:"25%", textAlign:"center"}}>{band.name}</h1>
            {admin?<div><NavLink to={`/bands/${id}/edit`}><button>Edit</button></NavLink>
            <NavLink to={`/bands/${id}/delete`}><button>Delete</button></NavLink></div>:""}
        </div>
        <div>
            <br/>
            <h2 className="flavor-text">Bio: </h2><p className="flavor-text">{band.bio}</p>
            <h2 className="flavor-text">From: </h2><p className="flavor-text">{band.origin}</p>
        </div>
        <div>
            <h2 className="flavor-text">Genres: </h2>
            <ul>
                {band.genres.map(g=><li><NavLink to={`/genres/${g.id}`} style={{backgroundColor:"black"}}>{g.name}</NavLink></li>)}
            </ul>
        </div>
        <div>
            <h2 className="flavor-text">Records: </h2>
            <ul>
                {band.records.map(r=><li><NavLink to={`/records/${r.id}`} style={{backgroundColor:"black"}}>{r.title}</NavLink></li>)}
            </ul>
        </div>
    </div>
}

export default BandPage;