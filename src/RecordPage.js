import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import './Record.css';

function RecordPage(props){
    const [record, setRecord] = useState({});
    const [loading, setLoading] = useState(true);
    const [addReview, setAddReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewed, setReviewed] = useState(false);
    const [fData, setFData] = useState({text:"", rating:5});
    const [edit, setEdit] = useState(false);
    const {id} = useParams();
    const admin = useSelector(store=>store.admin);
    const user = useSelector(store=>store.user);

    function checkReviewed(data){
        const check = data.filter(r=>r.username===user)[0];
        console.log(check);
        if(check){
            setFData(newFData=>({rating: check.rating, text: check.text}));
            console.log(fData);
            return true;
        }
        return false;
    }

    useEffect(()=>{
        async function getData(){
            const getRecord = await props.get(id);
            const getReviews = await props.getReviews(id);
            setReviews(getReviews);
            setRecord(getRecord);
            setReviewed(checkReviewed(getReviews));
            console.log(getRecord);
            setLoading(false);
        }
        getData();
    },[])

    function handleChange(evt){
        const {id, value} = evt.target;
        setFData(newFData=>({...fData, [id]: value}));
    }

    async function handleSub(evt){
        evt.preventDefault();
        try{
            let result
            if(edit){
                result = props.editReview(id, user, fData);
            }else if(addReview){
                result = await props.postReview(id, user, fData);
            }
            setReviews(newFData=>([...reviews, result]));
            alert(`Posted Review for ${record.title} Successfully!`);
        }catch(err){
            alert(err);
        }
    }

    if(loading)return <h1>LOADING...</h1>
    return <div>
        <div className="record">
            <div style={{display: "flex", justifyContent:"space-between"}}>
            <div style={{maxWidth:"33%"}} >
                <img src={`${record.imageurl}`} alt="NOT FOUND"/>
            </div>
                <h1>{record.title}</h1>
                <div>
                {admin?<div>
                <NavLink to={`/records/${record.id}/edit`}><button>Edit</button></NavLink>
                <button>Delete</button>
                </div>
                :""}
                </div>
            </div>
        </div>
        <div className="reviews">
            <h2>Band: <NavLink to={`/bands/${record.band_id}`}>{record.band.name}</NavLink></h2>
            <h3>Genres:</h3>
            <br/>
            <ul>
                {record.genres.map(g=>(<li><NavLink to={`/genres/${g.id}`}>{g.name}</NavLink></li>))}
            </ul>
            <div style={{display: "flex", justifyContent:"space-between"}}>
                {!admin&&!reviewed?<button onClick={evt=>(setAddReview(!addReview))}>{!addReview?"Add Review":"Close"}</button>:
                ""}
            </div>
                <h3>Rating: </h3>
                <h2>{record.rating}</h2>
                {addReview?<form onSubmit={handleSub}>
                    <label htmlFor="rating">Rating (1-5): </label>
                    <input value={fData.rating} onChange={handleChange} type="number" id="rating"></input>
                    <br/>
                    <label htmlFor="text">Review: </label>
                    <input value={fData.text} onChange={handleChange} type="text" id="text"></input>
                    <br/>
                    <button>Post Review</button>
                </form>:""}
            <div className="listings">
                {admin?<NavLink to={`/records/${record.id}/listings/add`}><button>Add Listing</button></NavLink>:""}
                <h4>Listings:</h4>
                <ul>
                    {record.listings.map(l=><li>
                        <NavLink to={`listings/${l.id}`}><h6>{l.id}</h6></NavLink>
                        <p> Quality: {l.quality} Price: {l.price} Stock: {l.stock} left</p>
                        <input type="button" onClick={evt=>props.addToCart(user, l.id)} value="Add To Cart"/>
                    </li>)}
                </ul>
            </div>
                <h2>Reviews: </h2>
            <ul>
                {reviews.map(r=>(<li><h4>{r.handle}</h4><h5>Rating: {r.rating}</h5><p>{r.text}</p>
                {r.username===user?<div><button onClick={evt=>(setEdit(!edit))}>{edit?"Close":"Edit"}</button><button>Delete</button>
                    {edit?<form onSubmit={handleSub}>
                    <label htmlFor="rating">Rating (1-5): </label>
                    <input value={fData.rating} onChange={handleChange} type="number" id="rating"></input>
                    <br/>
                    <label htmlFor="text">Review: </label>
                    <input value={fData.text} onChange={handleChange} type="text" id="text"></input>
                    <br/>
                    <button>Edit Review</button>
                </form>:""}</div>:
                ""}
                </li>))}
            </ul>
        </div>
    </div>
}

export default RecordPage;