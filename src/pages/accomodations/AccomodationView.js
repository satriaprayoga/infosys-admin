import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Content from '../../components/Content'
import { API_URL } from '../../const';
import Loading from '../Loading';

const AccomodationView = () => {
    
    const [loading,setLoading]=useState(false);
    const location = useLocation();

    const accomodation=location.state.accomodation;

    useEffect(() => {
       
    }, [])
    return (
        <>
        {loading && <Loading/>}
        <Content title={accomodation.name}
            subtitle={`${accomodation.name} Information`}
            widget={() => {
                return (
                    <>
                        <ul className="nav">
                            <li> <Link to={{ pathname: '/editAccomodation', state: { accomodation: accomodation } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-edit"></i>
                            </Link></li>
                            <li> <Link to={{ pathname: '/imageAccomodation', state: { accomodation: accomodation } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-camera"></i>
                            </Link></li>
                            <li>
                                <Link to={{ pathname: '/accomodations' }} className="btn btn-tool btn-sm">
                                    <i className="fas fa-list"></i>
                                </Link>
                            </li>
                        </ul>
                    </>

                )
            }}>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-primary"><i className="fas fa-map-marker-alt"></i>{accomodation.name}</h3>
                    <p className="text-muted">{accomodation.description}</p>

                    <div className="text-muted">
                        <p className="text-sm">Type
                            <b className="d-block">{accomodation.accomType.type}</b>
                        </p>
                        <p className="text-sm">Destination
                            <b className="d-block">{accomodation.destination}</b>
                        </p>
                        
                    </div>

                    <div className="text-muted">
                        <p className="text-sm">Facility
                            <b className="d-block">{accomodation.facility}</b>
                        </p>
                       
                        <p className="text-sm">Price
                            <b className="d-block">{'IDR '+accomodation.price}</b>
                        </p>
                       
                    </div>

                    
                </div>
                
            </div>


        </Content>
        </>
    )
}

export default AccomodationView
