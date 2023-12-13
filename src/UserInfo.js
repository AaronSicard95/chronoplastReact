import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function UserInfo(props){
    const [userInfo, setUserInfo] = useState({username: "Loading", orders: []});
    //const [loading, setLoading] = useState(true);
    const {username} = useParams();
    console.log(username);

    useEffect(()=>{
        async function getData(){
            console.log("called");
            const result = await props.get(username);
            console.log("finished");
            console.log(result);
            setUserInfo(result);
            //setLoading(false);
        }
        getData()
    },[])

    //if(loading)return <h1>LOADING: {loading}</h1>
    return <div className="flavor-text">
        <NavLink to={`/users/${username}/edit`}><button>Edit</button></NavLink>
        <h1>{userInfo.handle}</h1>
        <h2>Username: </h2>
        <p>{userInfo.username}</p>
    </div>
}

export default UserInfo;