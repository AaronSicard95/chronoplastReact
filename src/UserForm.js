import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

function UserForm(props){
    const user = useSelector(store=>store.user);
    const [fData, setFData] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        async function getUser(){
            const userInfo = await props.getInfo(user);
            console.log(userInfo);
            const {isadmin, username, ...rest} = userInfo;
            setFData(rest);
            setLoading(false);
        }
        getUser();
    },[]);

    async function handleSubmit(evt){
        evt.preventDefault();
        setSubmitted(true);
        const res = await props.checkPassword(user, fData.passCheck);
        console.log(res);
        let sendData = fData;
        delete fData.passCheck;
        if(res===true){
            const result = await props.sub(user, sendData);
            alert("Successfully Updated");
            navigate(`/users/${user}`);
        }else{
            alert("Password does not match");
            setSubmitted(false);
        }
    }

    function handleChange(evt){
        const {id, value} = evt.target;
        setFData(newFData=>({...fData, [id]: value}));
    }
    
    if(loading)return <h1>LOADING....</h1>
    return <form className="form-background" onSubmit={handleSubmit}>
    <label htmlFor="handle" style={{width:"25%"}}>Handle {"(What others will see)"}: </label>
    <input onChange={handleChange} type="text" id="handle" value={fData.handle}></input>
    <br/>
    <label htmlFor="email" style={{width:"25%"}}>Email: </label>
    <input onChange={handleChange} type="text" id="email" value={fData.email}></input>
    <br/>
    <label htmlFor="passCheck" style={{width:"25%"}}>Re-Type Password: </label>
    <input onChange={handleChange} type="password" id="passCheck"></input>
    <br/>
    <button disabled={submitted}>Submit</button>
</form>
}

export default UserForm;