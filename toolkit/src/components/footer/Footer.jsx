import React from 'react'
import fb from '../../assets/facebook.svg'
import telegram from '../../assets/tele.svg'
import twitter from '../../assets/twitter.svg'
import github from '../../assets/git.svg'
import './footer.css'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='foot-cont'>
      <div className='foot-left child'>
       <ul>
         <h2>About</h2>
         <li>Quotes</li>
         <li>Projects</li>
         <li>Blogs</li>
         <li>Contact Me</li>
       </ul>
      </div>
      <div className='foot-mid child'>
      <h2>Made with React and Redux 🔥 </h2>
      </div>
      <div className='foot-right child'>
      <ul>
         <h2>FOLLOW ME</h2>
         <li><img src={fb} alt='fb' className='icon' /></li>
         <li><img src={telegram} alt='telegram' className='icon' /></li>
         <li><img src={twitter} alt='twitter' className='icon tweet' /></li>
         <li><img src={github} alt='github' className='icon' /></li>
       </ul>
      </div>
      </div>
      
    </div>
  )
}

export default Footer