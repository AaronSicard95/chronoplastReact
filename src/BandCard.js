import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function BandCard(props){
    const imgDefault = useSelector(store=>store.imgDefault);
    const band = props.band;

    return <div>
        <div>
            <img className="img-25" src={band.imageurl?`${band.imageurl}`:require(`${imgDefault}`) } alt="Not Found"/>
        </div>
        <div>
            <h2><NavLink to={`/bands/${band.id}`}>{band.name}</NavLink></h2>
            <h4 className="flavor-text">Bio: {band.bio?band.bio.length>50?`${band.bio.slice(0,50)}...`:band.bio:"not available"}</h4>
            <p className="flavor-text">From: {band.origin}</p>
        </div>
    </div>
}

export default BandCard;