import { useState } from "react";

function TestPage(props){
    const [file, setFile] = useState();
    const [fData, setFData] = useState();

    const handleChange = (evt) =>{
        const {id,value} = evt.target;
        setFData(newFData=>({...fData, [id]: value}));
    }

    const handleSub = async (evt) =>{
        evt.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append("desc", fData.desc);
        setFData(newFData=>({...fData, 'image':file}));
        props.test(fData);
    }
    return <div>
        <form onSubmit={handleSub}>
            <label htmlFor="image"></label>
            <input type="file" id="image" accept="image/*"
            onChange={evt=>setFile(evt.target.files[0])}></input>
            <br/>
            <label htmlFor="desc"></label>
            <input type="text" id="desc"
            onChange={handleChange}></input>
            <br/>
            <button >TEST</button>
        </form>
        <img src='http://localhost:3001/images/undefined.jpg'></img>
    </div>
}

export default TestPage;