import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [collapsed,setCollapsed]=useState(false)
    const [display,setDisplay]=useState({display:'none'});

    const handleClick=()=>{
        setCollapsed(!collapsed);
        if(collapsed){
            setDisplay({
                display:'block'
            })
        }else{
            setDisplay({
                display:'none'
            })
        }
    }

    return (
        <>
            <aside id="aside" className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to="/" className="brand-link">
                    <span className="brand-text font-weight-light">InfoSys</span>
                </Link>
                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                            <a className="nav-link" onClick={handleClick}>
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Data
                                    <i className="right fas fa-angle-down"></i>
                                </p>
                             </a>
                             <ul className="nav nav-treeview" style={display}>
                                <li className="nav-item">
                                    <Link to="/countries" className="nav-link">
                                    
                                        <p>
                                            Countries
                                        
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/destinations" className="nav-link">
                                    
                                        <p>
                                            Destinations
                                        
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/tourPackages" className="nav-link">
                                    
                                        <p>
                                            Tour Packages
                                        
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/tours" className="nav-link">
                                    
                                        <p>
                                            Tours
                                        
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/accomPackages" className="nav-link">
                                    
                                        <p>
                                            Accomodation Packages
                                        
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/accomodations" className="nav-link">
                                    
                                        <p>
                                            Accomodations
                                        
                                        </p>
                                    </Link>
                                </li>
                             </ul>
                            </li>
                            <li className="nav-item">
                            <Link to="/customers" className="nav-link">
                                    
                            <i className="nav-icon fas fa-users"></i>
                                <p>
                                    Customers
                                   
                                </p>
                                    </Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/bookings" className="nav-link">
                                <i className="nav-icon fas fa-calendar"></i>
                                <p>
                                    Bookings
                                   
                                </p>
                             </Link>
                            </li>
                        </ul>
                    </nav>

                </div>

            </aside>
        </>
    );
}

export default Sidebar
