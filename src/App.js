import './App.css';
import LoginForm from './LoginForm';
import NavBar from './Navbar';
import {Routes, Route, useNavigate} from 'react-router-dom';
import ChronoApi from './api';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLocalToken, getLocalUser, getLocalAdmin, setLocalAdmin, setLocalToken, setLocalUser } from './localStorage';
import Records from './Records';
import RecordForm from './RecordForm';
import UserInfo from './UserInfo';
import TestPage from './TestPage';
import BandsPage from './BandsPage';
import BandPage from './BandPage';
import RecordPage from './RecordPage';
import GenrePage from './GenrePage';
import BandForm from './BandForm';
import SearchPage from './SearchPage';
import ListingForm from './ListingForm';
import Cart from './Cart';
import UserForm from './UserForm';
import Home from './Home';

function App() {
  const user = useSelector(store=>store.user);
  const admin = useSelector(store=>store.admin);
  console.log("APP USER: ", user);
  console.log("APP ADMIN:", admin);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    async function getData(){
      console.log("called setup effect");
      ChronoApi.setToken(getLocalToken());
      ChronoApi.setUser(getLocalUser());
      dispatch({type: "CHANGE", payload: getLocalUser()});
      dispatch({type: "ADMIN", payload: getLocalAdmin()});
      setLoading(false);
    }
    getData();
  },[]);

  useEffect(()=>{
    setLocalAdmin(admin);
    setLocalUser(user);
  }, [user, admin]);

  useEffect(()=>{
    console.log("User: ", user);
    console.log("Admin: ", admin);
    console.log("Api Token: ", ChronoApi.token);
  })

  const getRecords = async () =>{
    const result = await ChronoApi.getRecords();
    return result;
  }

  const makeRecord = async (data) =>{
    const newRecord = await ChronoApi.makeRecord(data);
    return newRecord;
  }

  const getUserInfo = async (username) =>{
    const userInfo = await ChronoApi.getUserInfo(username);
    return userInfo;
  }

  const placeOrder = async (record_id) =>{
    const order = await ChronoApi.placeOrder(record_id);
    return order;
  }

  const logout = async () =>{
    ChronoApi.setToken("");
    ChronoApi.setUser("");
    setLocalAdmin(false);
    setLocalToken("");
    setLocalUser("");
    dispatch({type: "CHANGE", payload: ""});
    dispatch({type: "ADMIN", payload: false});
    navigate('/');
  }

  const login = async (data) =>{
    console.log(data);
    const res = await ChronoApi.login(data);
    console.log("Login Result: ", res);
    setLocalToken(res.token);
    setLocalUser(res.username);
    setLocalAdmin(res.isadmin);
    dispatch({type: "ADMIN", payload: res.isadmin});
    dispatch({type: "CHANGE", payload: res.username});
  }

  const register = async (data) =>{
    const res = await ChronoApi.register(data);
    console.log(res);
    console.log(res.username);
    setLocalToken(res.token);
    setLocalUser(res.username);
    console.log("local user: ", getLocalUser());
    setLocalAdmin(res.isadmin);
    dispatch({type: "ADMIN", payload: res.isadmin});
    dispatch({type: "CHANGE", payload: res.username});
  }

  const testFunc = async (data) =>{
    let res = await ChronoApi.test(data);
    console.log(res);
  }

  const getBands = async () => {
    const res = await ChronoApi.getBands();
    return res;
  }

  const getBand = async (id) =>{
    const res = await ChronoApi.getBandByID(id);
    return res;
  }

  const getRecord = async (id) =>{
    const res = await ChronoApi.getRecordByID(id);
    return res;
  }

  const getGenres = async (search, onlyNames) =>{
    const res = await ChronoApi.getGenres(search, onlyNames);
    return res;
  }

  const getGenreInfo = async (id) =>{
    const res = await ChronoApi.getGenreRelation(id);
    return res;
  }

  const updateRecord = async (id, data)=>{
    const res = await ChronoApi.updateRecord(id, data);
    return res;
  }

  const makeBand = async (data)=>{
    const res = await ChronoApi.makeBand(data);
    return res;
  }

  const updateBand = async (id, data)=>{
    const res = await ChronoApi.updateBand(id, data);
    return res;
  }

  const postReview = async (id, username, data)=>{
    const res = await ChronoApi.postReview(id, username, data);
    return res;
  }

  const editReview = async (id, username, data)=>{
    const res = await ChronoApi.editReview(id, username, data);
    return res;
  }

  const getReviews = async (id)=>{
    const res = await ChronoApi.getReviews(id);
    return res;
  }

  const deleteReview = async (id, username)=>{
    const res = await ChronoApi.deleteReview(id, username);
    return res;
  }
  
  const search = async(term)=>{
    const res = await ChronoApi.search(term);
    return res;
  }

  const makeListing = async (id, data)=>{
    const res = await ChronoApi.postListing(id, data);
    return res;
  }

  const addToCart = async(username, listing_id)=>{
    const res = await ChronoApi.addToCart(username, listing_id);
    return res;
  }

  const removeFromCart = async(username, listing_id)=>{
    const res = await ChronoApi.removeFromCart(username, listing_id);
    return res;
  }

  const getCart = async(username)=>{
    const res = await ChronoApi.getCart(username);
    return res;
  }

  const checkout = async(username)=>{
    const res = await ChronoApi.checkout(username);
    return res;
  }

  const editUser = async (username, data)=>{
    const res = await ChronoApi.updateUser(username, data);
    return res;
  }

  const checkPassword=async (username, password)=>{
    const res = await ChronoApi.checkPassword(username, password);
    return res;
  }

  const topRecords=async()=>{
    const res = ChronoApi.topRecords();
    return res;
  }

  if(loading)return <h1>LOADING....</h1>
  return (
    <div className='background'>
      <div>
      <NavBar logout={logout}></NavBar>
      </div>
      <div>
      <Routes>
        <Route exact path='/' element={<Home getRecords={topRecords}/>}/>
        <Route exact path='/records' element={<Records order={placeOrder} getRecords={getRecords}/>}/>
        <Route path='/records/:id/listings/add' element={<ListingForm sub={makeListing}/>}/>
        <Route path='/records/:id/edit' element={<RecordForm sub={updateRecord} edit={true} getRecord={getRecord} getBands={getBands} getGenres={getGenres}/>}/>
        <Route path='/records/:id' element={<RecordPage get={getRecord} getReviews={getReviews}
        editReview={editReview} postReview={postReview} deleteReview={deleteReview} addToCart={addToCart}/>}/>
        <Route path='/users/:username' element={<UserInfo get={getUserInfo}/>}/>
        <Route path='/genres/:id' element={<GenrePage get={getGenreInfo}/>}/>
        <Route exact path='/bands' element={<BandsPage get={getBands}/>}/>
        <Route path='/bands/:id/edit' element={<BandForm sub={updateBand} getBand={getBand} getGenres={getGenres} edit={true}/>}/>
        <Route path = '/bands/:id' element={<BandPage get={getBand}/>}/>
        <Route path='bands/add' element={<BandForm sub={makeBand} getGenres={getGenres}/>}/>
        <Route exact path='/records/add' element={<RecordForm getBands={getBands} getGenres={getGenres} sub={makeRecord}/>}/>
        <Route path='/users/:username/edit' element={<UserForm getInfo={getUserInfo} checkPassword={checkPassword} sub={editUser}/>}/>
        <Route path='/users/:username' element={<UserInfo get={getUserInfo}/>}/>
        <Route path="/login" element={<LoginForm login={login} sub={register}></LoginForm>}></Route>
        <Route path="/test" element={<TestPage test={testFunc}></TestPage>}></Route>
        <Route path='/search/:search' element={<SearchPage search={search}/>}/>
        <Route path='/cart' element={<Cart get={getCart} pay={checkout}/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
