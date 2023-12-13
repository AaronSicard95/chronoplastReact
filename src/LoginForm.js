import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";

function LoginForm(props){
    const user = useSelector(store=>store.user);
    const [login, setLogin] = useState(true);
    const INITIAL_STATE_REGISTER = {
        username: "",
        handle: "",
        password: "",
        passCheck: "",
        first_name: "",
        last_name: "",
        email: ""
    }
    const INITIAL_STATE_LOGIN = {
        username: "",
        password: ""
    }
    const navigate = useNavigate();
    const [fData, setFData] = useState(INITIAL_STATE_REGISTER);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(evt){
        const {id, value} = evt.target;
        setFData(newFData=>({...fData, [id]: value}));
    }

    useEffect(()=>{
        if(user!==""){
            navigate("/");
        }
    },[user]);

    async function handleSubmit(evt){
        evt.preventDefault();
        if(login){
            setSubmitted(true);
            await props.login(fData);
            setSubmitted(false);
        }else{
            if(fData.password!==fData.passCheck){
                alert("passwords do not match");
                return;
            }
            setSubmitted(true);
            await props.sub(fData);
            setSubmitted(false);}
    }

    function change(){
        setLogin(!login);
        if(login){
            setFData(INITIAL_STATE_LOGIN);
        }else{
            setFData(INITIAL_STATE_REGISTER);
        }
    }

    return <div className="form-background">
        {login?
        <button onClick={change}>Don't have an account? Register</button>:
        <button onClick={change}>Already have an account? Login</button>}
        {login?
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username"></input>
            <br/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password"></input>
            <br/>
            <button>Login</button>
        </form>:
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <label htmlFor="username" style={{width:"25%"}}>Username: </label>
            <input type="text" id="username"></input>
            <br/>
            <label htmlFor="handle" style={{width:"25%"}}>Handle {"(What others will see)"}: </label>
            <input type="text" id="handle"></input>
            <br/>
            <label htmlFor="password" style={{width:"25%"}}>Password: </label>
            <input type="password" id="password"></input>
            <br/>
            <label htmlFor="passCheck" style={{width:"25%"}}>Re-Type Password: </label>
            <input type="password" id="passCheck"></input>
            <br/>
            <label htmlFor="email" style={{width:"25%"}}>Email: </label>
            <input type="text" id="email"></input>
            <br/>
            <button disabled={submitted}>Submit</button>
        </form>}
    </div>
}

export default LoginForm;