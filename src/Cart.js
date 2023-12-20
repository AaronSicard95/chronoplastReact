import { useEffect, useState } from "react";
import { getLocalUser } from "./localStorage";

function Cart(props){
    const user = getLocalUser();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState();

    useEffect(()=>{
        async function getCart(){
            console.log(user);
            const cart = await props.get(user);
            console.log(cart);
            setCart(cart);
            let price = 0;
            for(let listing of cart){
                price+=listing.price;
            }
            setTotal(price);
            setLoading(false);
        }
        getCart()
    },[]);

    const handleCheckout = async (evt) =>{
        evt.preventDefault();
        const res= await props.pay(user);
        alert(res);
    }

    if(loading)return <h1>LOADING...</h1>
    return <div>
        <h1 className="flavor-text">{user}'s Cart:</h1>
        <ul>
            {cart.map(c=><li className="flavor-text">
                <h3>{c.record.title}</h3>
                <p>Price: {c.price}</p>
            </li>)}
        </ul>
        <h1 className="flavor-text">Total: {total}</h1>
        <input onClick={handleCheckout} type="button" value="Checkout"/>
    </div>
}

export default Cart;