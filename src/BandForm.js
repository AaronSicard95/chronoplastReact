import { useState, useEffect } from"react";
import { useParams } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';

function BandForm(props){
    const{id}=useParams();
    const [updateImage, setUpdateImage] = useState(false);
    const [fData, setFData] = useState({name: "", bio: "", origin: "", genres:[]});
    const [file, setFile] = useState();
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    async function handleSubmit(evt){
        evt.preventDefault();
        console.log(fData);
        let sendData = fData;
        delete sendData.updateImage;
        if(file!==undefined)sendData={...sendData, "image": file};
        console.log(file);
        if(!props.edit){
            await props.sub(sendData);
        }else{
            await props.sub(id, sendData);
        }
    }

    useEffect(()=>{
        async function getData(){
            const genreData = await props.getGenres("");
            if(props.edit){
                const bandData = await props.getBand(id);
                setFData(newFData=>({origin: bandData.origin, name: bandData.name, bio: bandData.bio, genres: bandData.genres.map(g=>g.name)}));
                console.log(bandData);
            }
            setGenres(genreData);
            setLoading(false);
        }
        getData();
    },[]);

    function handleChange(evt){
        const {id, value} = evt.target;
        setFData(newFData=>({...fData, [id]: value}));
    }

    function handleSelect(evt, type){
        //const {id} = evt.target;
        console.log(evt);
        setFData(newFData=>({...fData, [type]: Array.isArray(evt)?evt.map(g=>g.value):evt.value}));
    }

    if(loading)return <h1>LOADING...</h1>
    return <form onSubmit={handleSubmit} className="form-background">
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" value={fData.name} onChange={handleChange}></input>
        <br/>
        <label htmlFor="bio">Bio: </label>
        <input onChange={handleChange} id="bio" value={fData.bio}/>
        <br/>
        <label htmlFor="origin">From: </label>
        <input onChange={handleChange} id="origin" value={fData.origin}/>
        <br/>
        {props.edit?<div><label htmlFor="updateImage">Update Image?</label><input onChange={evt=>(setUpdateImage(!updateImage))} type="checkbox" id="updateImage"></input></div>:""}
        {props.edit?updateImage?
        <div><label htmlFor="image">New Band image:</label>
        <input type="file" id="image"
        onChange={evt=>setFile(evt.target.files[0])}></input>
        <br/></div>:""
        :<div><label htmlFor="image">Band image:</label>
        <input type="file" id="image"
        onChange={evt=>setFile(evt.target.files[0])}></input>
        <br/></div>}
        <label htmlFor="genres">Genres: </label>
        <CreatableSelect onChange={(evt)=>handleSelect(evt, 'genres')} isClearable isMulti options={genres.map(g=>({value:g.name, label:g.name}))} value={fData.genres.map(g=>({value:g,label:g}))}/>
        <br/>
        <button>Submit</button>
    </form>
}

export default BandForm;