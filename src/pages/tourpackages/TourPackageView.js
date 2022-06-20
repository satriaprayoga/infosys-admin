import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Content from '../../components/Content'
import { API_URL } from '../../const';
import Loading from '../Loading';

const TourPackageView = () => {
    const [tourCount,setTourCount]=useState(0);
    const [loading,setLoading]=useState(false);
    const location = useLocation();

    const tourType=location.state.tourType;

    const fetchTourCount=async()=>{
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/tourTypes/countTours/${location.state.tourType.id}`);
            if(!data){
                setLoading(false);
                return;
            }
            console.log(data);
            setTourCount(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTourCount();
    }, [])
    return (
        <>
        {loading && <Loading/>}
        <Content title={tourType.type}
            subtitle={`${tourType.type} Information`}
            widget={() => {
                return (
                    <>
                        <ul className="nav">
                            <li> <Link to={{ pathname: '/editTourPackage', state: { tourType: tourType } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-edit"></i>
                            </Link></li>
                            <li> <Link to={{ pathname: '/imageTourPackage', state: { tourType: tourType } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-camera"></i>
                            </Link></li>
                            <li>
                                <Link to={{ pathname: '/tourTypes' }} className="btn btn-tool btn-sm">
                                    <i className="fas fa-list"></i>
                                </Link>
                            </li>
                        </ul>
                    </>

                )
            }}>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-primary"><i className="fas fa-map-marker-alt"></i>{tourType.type}</h3>
                    <p className="text-muted">{tourType.description}</p>

                    <div className="text-muted">
                        <p className="text-sm">Location
                            <b className="d-block">{tourType.destination.name+", "+tourType.destination.state}</b>
                        </p>
                    </div>

                    
                </div>
                <div className="col-12 col-md-12 col-lg-8 order-2 order-md-2">
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <div className="info-box bg-success">
                                <span className="info-box-icon"><i className="fas fa-atlas"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Tours</span>
                                    <span className="info-box-number">{tourCount}</span>
                                    <Link to={{ pathname: '/tours', state:{tourType:tourType}}} className="small-box-footer text-light">
                                        More info <i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>


        </Content>
        </>
    )
}

export default TourPackageView
