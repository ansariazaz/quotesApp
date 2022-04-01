import React, { useState } from 'react'
import './signup.css'
import img from '../../assets/bgsign.jpg'
import icon from '../../assets/login.png'
import {useDispatch,useSelector }from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import { signinUser, signupUser } from '../../Reducers/authReducer'
const SignUp = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSignin, setShowSignin] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                break
        }
    }
    const resetForm =()=>{
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("")
    }
    const dispatch = useDispatch();
    const {loading,error} = useSelector(state=>state.user)
    const notify = (error) => toast(error);
    const handleSignIn = () => {
        if(email==="" && password===""){
            notify("Please enter all data")
            return
            }
            dispatch(signinUser({email,password}));

           
    }
    const handleSignUp = () => {
        if(firstName==="" || lastName==="" || email==="" || password===""){
        notify("Please enter all data")
        return
        }
        dispatch(signupUser({firstName,lastName,email,password}));
        resetForm();
        setShowSignin(true)
        notify("Please signin to continue....")
    }
  
    return (
        <>
          <ToastContainer />
          {loading ? <div className='loading'><ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'}  /></div>:
            <div className="signup-cont">
                <div className='left'>
                    <div className='imgCont'>
                        <img src={img} alt='img' className='img' />
                    </div>
                </div>
                {showSignin ?
                    <div className='right'>
                        <div className='iconCont'>
                            <img src={icon} alt='icon' className='sign-icon' />
                            <h1>Signin</h1>
                        </div>
                        <div className='formCont'>
                            <div className='form'>
                                <div className='formItem'>
                                    <input placeholder='Email' className='form-input' type="email" name='email' value={email} onChange={handleChange} />
                                </div>
                                <div className='formItem'>
                                    <input placeholder='Password' className='form-input' type="password" name='password' value={password} onChange={handleChange} />
                                </div>
                                <div className='formItem'>
                                    <button className='btn' onClick={handleSignIn} >Sign in</button>
                                </div>
                            </div>
                            <div className='account'>
                                <h4>Don't have a account? <span onClick={() => setShowSignin(!showSignin)} className='link'>Sign up</span></h4>
                            </div>
                        </div>
                    </div> :
                    <div className='right'>
                        <div className='iconCont'>
                            <img src={icon} alt='icon' className='sign-icon' />
                            <h1>Signup</h1>
                        </div>
                        <div className='form'>
                            <div className='formItem'>
                                <input placeholder='First Name' className='form-input' type="text" name='firstName' value={firstName} onChange={handleChange} />
                            </div>
                            <div className='formItem'>
                                <input placeholder='Last Name' className='form-input' type="text" name='lastName' value={lastName} onChange={handleChange} />
                            </div>
                            <div className='formItem'>
                                <input placeholder='Email'  className='form-input' type="email" name='email' value={email} onChange={handleChange} />
                            </div>
                            <div className='formItem'>
                                <input placeholder='Password' className='form-input' type="password" name='password' value={password} onChange={handleChange} />
                            </div>
                            <div className='formItem'>
                                <button className='btn' onClick={handleSignUp} >Sign up</button>
                            </div>
                        </div>
                        <div className='account'>
                            <h4>Already have a account?<span onClick={() => setShowSignin(!showSignin)} className='link'>Sign in</span></h4>   
                        </div>
                    </div>}
            </div>}
        </>
    )
}

export default SignUp