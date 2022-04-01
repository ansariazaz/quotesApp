import React from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchQuote,deleteQuote } from '../../Reducers/quoteReducer'
import './quote.css';
import close from '../../assets/close.svg'
import search from '../../assets/search.svg'
import empty from '../../assets/empty.png'
import { useState } from 'react';
const Quotes = () => {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchQuote())
  },[])
 const quotes = useSelector(state => state.quotes)
 const deleteCard=(id)=>{
   dispatch(deleteQuote(id))
 }
  return (
    <div className='container1'>
      <h1 className='all'>All Popular quotes...</h1>
      <div className='search-cont'>
        <img src={search} alt='search' className='find'/>
        <input type='text' placeholder='Search Quotes...' value={query} onChange={(e)=>setQuery(e.target.value)}/>
      </div>
      {quotes.length ? <div className='quotes-cont'>
        {quotes?.filter(item=>item.quotes.toLowerCase().includes(query)).map((item) => (
          <div key={item._id} className='card' >
            <span>{item.quotes}</span>
            <img src={close} alt='close' className='close' onClick={()=>deleteCard(item._id)}/>
          </div>
        ))}
      </div>:
      <div className='empty-cont'>
        <div className='empty'>
        <img src={empty} alt='list' className='list'/>
        <h3>Oh oh !!! No Quotes Available...Create one</h3>
        </div>
      </div> }
     
    </div>
  )
}

export default Quotes