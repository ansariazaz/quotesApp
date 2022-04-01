import React, { useEffect } from 'react';
import './App.css';
import SignUp from './components/auth/SignUp';
import {useSelector,useDispatch} from 'react-redux'
import { addToken } from './Reducers/authReducer';
import Home from './components/Home/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AddQuotes from './components/add-quote/AddQuotes';
import Quotes from './components/quotes/Quotes';

function App() {
  const token = useSelector(state=>state.user.token)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(addToken());
  },[])
  
  return (
    <div className="App">
      
       <BrowserRouter>
       <Routes>
       <Route path='/' exact element={token ? <Home/>:<SignUp/> }/>
       <Route path='/addquote' element={<AddQuotes/>}/>
       <Route path='/quote' element={<Quotes/>}/>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
   