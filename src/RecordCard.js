
import { NavLink } from 'react-router-dom';
import './recordStyle.css';

function RecordCard(props){
    const record = props.record;

    return <div className='container'>
        <div className='imgcontainer'><img src={`${record.imageurl}`} alt='Not Found'></img></div>
        <div>
        <NavLink to={`/records/${record.id}`}><h2>{record.title}</h2></NavLink>
        <br/>
        <h5 className='flavor-text'>{record.bandname}</h5>
        <br/>
        </div>
    </div>
}

export default RecordCard;