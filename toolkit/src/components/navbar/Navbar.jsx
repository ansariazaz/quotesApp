import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './navbar.css'
import { logout } from '../../Reducers/authReducer'
const Navbar = () => {


    const dispatch = useDispatch()
   
    return (
        <div className='navbar'>
            <div className='nav-left' >
                <span className='logo'>QUOTES</span>
                <Link to='/' className='home'>Home</Link>
                <Link to='/quote' className='quotes'>Quotes</Link>
                <Link to='/about' className='about'>About</Link>
                <Link to='/contact' className='contact'>Contact</Link>
            </div>
            <div>
                <div className='nav-right'>
                    <div className='add-quotes'>
                     <Link to='/addquote' className='nav-btn add'>Add Quotes</Link>  
                    </div>
                    <button className='nav-btn log' onClick={()=>dispatch(logout())}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar