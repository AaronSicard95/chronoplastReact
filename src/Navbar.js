import { useSelector } from "react-redux";
import{Navbar,NavbarBrand, Nav, NavItem} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css';

function NavBar(props){
    //const [user,setUser] = useState(useSelector(store => store.user));
    const [searchTerm, setSearchTerm] = useState("");
    const redUser = useSelector(store => store.user);
    const navigate = useNavigate();

    useEffect(()=>{
        async function getUser(){
            //setUser(redUser);

        };
        getUser();
    },[redUser])

    const logout = async () =>{
        props.logout();
        navigate("/");
    }

    const handleSearch = (evt)=>{
        evt.preventDefault();
        navigate(`/search/${searchTerm}`);
    }

    return <div>
        <Navbar color="dark" expand>
            <Nav>
        <NavbarBrand><NavLink to="/"><img className="img-transparent" style={{width:"50px",height:"50px"}} alt="Home" src={require("./LogoTransparent.png")}></img>Chronoplast</NavLink></NavbarBrand>
        <NavLink className="links" to='/records'>Records</NavLink>
        <NavLink className="links" to='/bands'>Bands</NavLink>
        </Nav>
        <Nav>
            <form onSubmit={handleSearch}>
                <label className="links">Search: </label>
                <input value={searchTerm} onChange={evt=>(setSearchTerm(evt.target.value))} type="text"></input>
                <button>Search</button>
            </form>
        </Nav>
        <Nav>
            <NavItem>
                <NavLink className="links" style={{margin: "5px"}} to={`/users/${redUser}`}>{redUser}</NavLink>
                {!redUser?
                <NavLink className="links" style={{margin: "5px"}} to="/login">LogIn/Register</NavLink>:<div style={{display: "inline-block"}}>
                <NavLink to='/cart'>Cart</NavLink>
                <NavLink onClick={logout} className="links" style={{margin: "5px"}}>LogOut</NavLink></div>}
            </NavItem>
        </Nav>
    </Navbar>
    </div>
}

export default NavBar;