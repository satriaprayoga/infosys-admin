import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Content from '../../components/Content'
import { API_URL } from '../../const';
import Loading from '../Loading';

const DestinationView = () => {

    const [tourCount,setTourCount]=useState(0);
    const [accomCount,setAccomCount]=useState(0);
    const [loading,setLoading]=useState(false);
    const location = useLocation();

    const dest=location.state.destination;

    const fetchTourCount=async()=>{
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/destinations/countTours/${location.state.destination.id}`);
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

    const fetchAccomCount=async()=>{
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/destinations/countAccoms/${location.state.destination.id}`);
            if(!data){
                setLoading(false);
                return;
            }
            console.log(data);
            setAccomCount(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTourCount();
        fetchAccomCount();
    }, [])

    return (
        <>
        {loading && <Loading/>}
        <Content title={dest.name}
            subtitle={`${dest.name} Information`}
            widget={() => {
                return (
                    <>
                        <ul className="nav">
                            <li> <Link to={{ pathname: '/editDestination', state: { destination: dest } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-edit"></i>
                            </Link></li>
                            <li> <Link to={{ pathname: '/imageDestination', state: { destination: dest } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-camera"></i>
                            </Link></li>
                            <li>
                                <Link to={{ pathname: '/destinations' }} className="btn btn-tool btn-sm">
                                    <i className="fas fa-list"></i>
                                </Link>
                            </li>
                        </ul>
                    </>

                )
            }}>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-primary"><i className="fas fa-map"></i>{dest.name}</h3>
                    <p className="text-muted">{dest.description}</p>

                    <div className="text-muted">
                        <p className="text-sm">Company
                            <b className="d-block">{dest.company}</b>
                        </p>
                        <p className="text-sm">Phone
                            <b className="d-block">{dest.phone}</b>
                        </p>
                        <p className="text-sm">Email
                            <b className="d-block">{dest.email}</b>
                        </p>
                    </div>

                    <div className="text-muted">
                        <p className="text-sm">Country
                            <b className="d-block">{dest.country}</b>
                        </p>
                        <p className="text-sm">State/Province
                            <b className="d-block">{dest.state}</b>
                        </p>
                        <p className="text-sm">City
                            <b className="d-block">{dest.city}</b>
                        </p>
                        <p className="text-sm">Address
                            <b className="d-block">{dest.address}</b>
                        </p>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-8 order-2 order-md-2">
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <div className="info-box bg-info">
                                <span className="info-box-icon"><i className="fas fa-map-marker-alt"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Tour Packages</span>
                                    <span className="info-box-number">{tourCount}</span>
                                    <Link to={{ pathname: '/tourPackages', state: { destination: dest } }} className="small-box-footer text-light">
                                        More info <i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">
                            <div className="info-box bg-success">
                                <span className="info-box-icon"><i className="fas fa-caravan"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Accomodation</span>
                                    <span className="info-box-number">{accomCount}</span>
                                    <Link to={{ pathname: '/accomPackages', state: { destination: dest } }} className="small-box-footer text-light">
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

export default DestinationView
