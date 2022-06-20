import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Home = () => {
    return (
        <>
       
        <Content title="Home" 
                subtitle="Welcome"
                widget={()=>{}}
                >
            <h2>Welcome to InfosysAdmin</h2>
        </Content>
       
        </>
    )
}

export default Home
