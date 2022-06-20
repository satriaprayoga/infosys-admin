import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const NotFound = () => {
    const onEnterPage=()=>{
        const body = document.body;
        body.classList.remove('sidebar-mini');
        body.classList.add('login-page')

        // const nav = document.getElementById("nav")
        // nav.style.display = 'none';

        // const aside = document.getElementById("aside")
        // aside.style.display = 'none';

        const root = document.getElementById('root')
        root.classList.remove('wrapper');
        root.classList.add('login-box');
    }

    const onLeavePage=()=>{
        const body = document.body;
            body.classList.add('sidebar-mini');
            body.classList.remove('login-page')
    
            const root = document.getElementById('root')
            root.classList.add('wrapper');
            root.classList.remove('login-box');
    }

    useEffect(() => {
        onEnterPage();

        return()=>{
           onLeavePage();
        }

        // const footer = document.getElementById("footer")
        // footer.style.display = 'none';

    }, [])
    return (
        <>
        
        <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <a href="../../index2.html" className="h1"><b>404 Not Found</b></a>
                </div>
                
            </div>
      
        </>
    )
}

export default NotFound
