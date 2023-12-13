import { useState, useEffect } from"react";
import { useParams } from "react-router-dom";

function ListingForm(props){
    const{id}=useParams();
    console.log(id);
    const [updateImage, setUpdateImage] = useState(false);
    const [fData, setFData] = useState({price: 9.80, stock: 888, quality:""});
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(true);

    async function handleSubmit(evt){
        evt.preventDefault();
        console.log(fData);
        let sendData = fData;
        delete sendData.updateImage;
        if(file!==undefined)sendData={...sendData, "image": file};
        console.log(file);
        if(!props.edit){
            await props.sub(id, sendData);
        }else{
            await props.sub(id, sendData);
        }
    }

    useEffect(()=>{
        async function getData(){
            setLoading(false);
        }
        getData();
    },[]);

    function handleChange(evt){
        let {id, value} = evt.target;
        console.log(id, value);
        if(id==="price"){
            if(value>9999999)value = 9999999;
            value=Math.floor(value*100)/100;
        }else if(id==="stock"){
            if(value>9999999)value = 9999999;
            value = Math.floor(value);
        }
        setFData(newFData=>({...fData, [id]: value}));
    }

    if(loading)return <h1>LOADING...</h1>
    return <form onSubmit={handleSubmit}>
        <label htmlFor="quality">Quality: </label>
        <input type="text" id="quality" value={fData.quality} onChange={handleChange}></input>
        <br/>
        <label htmlFor="price">Price: $</label>
        <input id="price" type="number" value={fData.price}
        onChange={handleChange}/>
        <br/>
        {props.edit?<div><label htmlFor="updateImage">Update Image?</label><input onChange={evt=>(setUpdateImage(!updateImage))} type="checkbox" id="updateImage"></input></div>:""}
        {props.edit?updateImage?
        <div><label htmlFor="image">New Listing image:</label>
        <input type="file" id="image"
        onChange={evt=>setFile(evt.target.files[0])}></input>
        <br/></div>:""
        :<div><label htmlFor="image">Listing image:</label>
        <input type="file" id="image"
        onChange={evt=>setFile(evt.target.files[0])}></input>
        <br/></div>}
        <label htmlFor="stock">How many are available?: </label>
        <input id="stock" type="number"
        onChange={handleChange} value={fData.stock}/>
        <br/>
        <button>Submit</button>
    </form>
}

export default ListingForm;