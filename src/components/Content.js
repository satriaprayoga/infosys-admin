import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { AuthContext } from '../context/AuthContext'
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const Content = (props) => {

    const authContext=useContext(AuthContext);
    

    return (
        <>
        <Header />
        <Sidebar />
        <div className="content-wrapper">

    <section className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>{props.title}</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active">{props.pageTitle}</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>


    <section className="content">


        <div className="card">
            <div className="card-header">
                <h3 className="card-title">{props.subtitle}</h3>

                <div className="card-tools">
                    {props.widget?props.widget():()=>{}}
                </div>
            </div>
            <div className="card-body">
               {props.children}
</div>

            <div className="card-footer">
                {props.footer?props.footer():()=>{}}
            </div>

        </div>

    </section>

</div>
<Footer/>
</>
    )
    
}

export default Content
