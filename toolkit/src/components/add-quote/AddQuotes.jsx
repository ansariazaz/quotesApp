import React from 'react'
import { useState } from 'react'
import Navbar from '../navbar/Navbar'
import './addquote.css'
import { createQuote } from '../../Reducers/quoteReducer'
import {useDispatch,useSelector}from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';
const AddQuotes = () => {
  const [quotes, setQuote] = useState('')
  const [loading,setLoading] = useState(false)
  const handleChange = (e) => {
    setQuote(e.target.value)
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const saveQuote = ()=>{
      dispatch(createQuote({quotes}))
       setLoading(true)
       setTimeout(()=>{
        navigate('/')
       },1000) 
      notify("your quote is saved"); 
  }


  const notify = (msg) => toast(msg);
  return (
    <div>
      <Navbar />
      <ToastContainer />
      {loading ? <div className='loading'> <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'}  /></div>:
      <div className='container'>
        <div className='content'>
          <h1>Add Quotes</h1>
          <div className='cont'>
            <textarea type='text' className='text' placeholder='Write Quotes...' value={quotes} onChange={handleChange} />
            <button className='btn save' onClick={saveQuote} >Save Quote</button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default AddQuotes