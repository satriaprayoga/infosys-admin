import React from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {signOut, useAuthDispatch} from '../context';

const Header = () => {

    const dispatch=useAuthDispatch();
    const history=useHistory();

    const handleSignOut=async()=>{
        signOut(dispatch);
        history.push('/');
    }

    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light" id="nav">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                    
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
                            <i className="far fa-user"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right" style={{left: 'inherit', right: '0px'}}>
                           
                            <button className="dropdown-item" onClick={handleSignOut}>
                                <i className="fas fa-power-off mr-2"></i> Sign Out
                                
                            </button>
                            <div className="dropdown-divider"></div>
                            <Link to="/siteInfo" className="dropdown-item">
                                <i className="fas fa-cogs mr-2"></i> Settings
                                
                            </Link>
                            <div className="dropdown-divider"></div>

                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header
