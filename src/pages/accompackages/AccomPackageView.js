import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Content from '../../components/Content'
import { API_URL } from '../../const';
import Loading from '../Loading';

const AccomPackageView = () => {
    const [accomCount,setAccomCount]=useState(0);
    const [loading,setLoading]=useState(false);
    const location = useLocation();

    const accomType=location.state.accomType;

    const fetchAccomCount=async()=>{
        try {
            setLoading(true);
            let { data } = await axios.get(`${API_URL}/api/v1/accomTypes/countAccoms/${location.state.accomType.id}`);
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
        fetchAccomCount();
    }, [])
    return (
        <>
        {loading && <Loading/>}
        <Content title={accomType.type}
            subtitle={`${accomType.type} Information`}
            widget={() => {
                return (
                    <>
                        <ul className="nav">
                            <li> <Link to={{ pathname: '/editAccomPackage', state: { accomType: accomType } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-edit"></i>
                            </Link></li>
                            <li> <Link to={{ pathname: '/imageAccomPackage', state: { accomType: accomType } }} className="btn btn-tool btn-sm">
                                <i className="fas fa-camera"></i>
                            </Link></li>
                            <li>
                                <Link to={{ pathname: '/accomTypes' }} className="btn btn-tool btn-sm">
                                    <i className="fas fa-list"></i>
                                </Link>
                            </li>
                        </ul>
                    </>

                )
            }}>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-primary"><i className="fas fa-map-marker-alt"></i>{accomType.type}</h3>
                    <p className="text-muted">{accomType.description}</p>

                    <div className="text-muted">
                        <p className="text-sm">Location
                            <b className="d-block">{accomType.destination.name+", "+accomType.destination.state}</b>
                        </p>
                    </div>

                    
                </div>
                <div className="col-12 col-md-12 col-lg-8 order-2 order-md-2">
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <div className="info-box bg-success">
                                <span className="info-box-icon"><i className="fas fa-bed"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Accomodations</span>
                                    <span className="info-box-number">{accomCount}</span>
                                    <Link to={{ pathname: '/accomodations', state:{accomType:accomType}}} className="small-box-footer text-light">
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

export default AccomPackageView
