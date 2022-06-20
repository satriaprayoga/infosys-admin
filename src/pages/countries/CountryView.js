import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Content from '../../components/Content';
import { API_URL } from '../../const';
import { useAuthState } from '../../context'
import Loading from '../Loading';

const CountryView = () => {

    const location=useLocation();
    const [country,setCountry]=useState({});
    const [loading,setLoading]=useState(false);
    
    const fetchData=async()=>{
        setLoading(true);
        try {
           
            let id=location.state.id;
            if(id){
                let {data}=await axios.get(`${API_URL}/api/v1/countrys/${id}`);
                if(!data){
                    setLoading(false);
                    toast.error('Error fetching data');
                    return;
                }
                setCountry(data);
                setLoading(false)
            }
        } catch (error) {
             toast.error('Error fetching data');
             setLoading(false);
        }
    }

    useEffect(() => {
       fetchData();
    }, [])

    return (
        <>
        {loading && <Loading />}
            <Content title={country.name}
                subtitle=''
                widget={() => {
                    return (
                        <>
                        <ul className="nav nav-pills ml-auto">
                        <li className="nav-item"> 
                            <Link to="/createCountry" className="nav-link">
                                <i className="fas fa-plus"></i>
                            </Link>
                        </li>
                        <li className="nav-item"> 
                        <Link to="/countries" className="nav-link">
                            <i className="fas fa-list"></i>
                        </Link>
                        </li>
                        </ul>
                        </>
                        

                    )
                }}>
                

            </Content>
        </>
    )
}

export default CountryView
