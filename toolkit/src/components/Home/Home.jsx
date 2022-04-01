import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import Quotes from '../quotes/Quotes'

const Home = () => {
  return (
    <div className=''>
        <Navbar/>
        <Quotes/>
        <Footer/>
    </div>
  )
}

export default Home