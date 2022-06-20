import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Content from '../../components/Content'
import { API_URL } from '../../const';
import Loading from '../Loading';

const TourView = () => {
    
    const [loading,setLoading]=useState(false);
    const location = useLocation();

    const tour=location.state.tour;

    useEffect(() => {
       
    }, [])
    return (
        <>
        {loading && <Loading/>}
        <Content title={tour.name}
            subtitle={`${tour.name} Information`}
            widget={() => {
                return (
                    <>
                        <ul className="nav">
                            <li> <Link to={{ pathname: '/editTour', state: { tour: tour } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-edit"></i>
                            </Link></li>
                            <li> <Link to={{ pathname: '/imageTour', state: { tour: tour } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-camera"></i>
                            </Link></li>
                            <li>
                                <Link to={{ pathname: '/tours' }} className="btn btn-tool btn-sm">
                                    <i className="fas fa-list"></i>
                                </Link>
                            </li>
                        </ul>
                    </>

                )
            }}>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-primary"><i className="fas fa-map-marker-alt"></i>{tour.name}</h3>
                    <p className="text-muted">{tour.description}</p>

                    <div className="text-muted">
                        <p className="text-sm">Type
                            <b className="d-block">{tour.tourType.type}</b>
                        </p>
                        <p className="text-sm">Destination
                            <b className="d-block">{tour.destination}</b>
                        </p>
                        
                    </div>

                    <div className="text-muted">
                        <p className="text-sm">Activity
                            <b className="d-block">{tour.activity}</b>
                        </p>
                        <p className="text-sm">Spots
                            <b className="d-block">{tour.spots}</b>
                        </p>
                        <p className="text-sm">Price
                            <b className="d-block">{'IDR '+tour.price}</b>
                        </p>
                        <p className="text-sm">Duration
                            <b className="d-block">{tour.day + 'Days/ '+tour.night+ ' Nights'}</b>
                        </p>
                    </div>

                    
                </div>
                
            </div>


        </Content>
        </>
    )
}

export default TourView
